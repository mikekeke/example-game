import type { Pool } from 'pg';

import parse from './parser.js';
import type Prando from 'paima-sdk/paima-prando';
import type { SubmittedChainData } from 'paima-sdk/paima-utils';
import type { SQLUpdate } from 'paima-sdk/paima-db';
import { insertSubmission, IInsertSubmissionParams, getAchievementsByOwned, IGetAchievementsByOwnedResult, getAchievements, GetAchievementsError } from '@game/db';
import { ScheduledDataInput, SubmitGuess, isAchievementNft } from './types.js';
import { MatchMove, initRoundExecutor } from '@game/game-logic';

import { initAchievementsQuery, updateAchievements } from './updates.js';

export default async function (
  inputData: SubmittedChainData,
  blockHeight: number,
  randomnessGenerator: Prando,
  dbConn: Pool
): Promise<SQLUpdate[]> {
  console.log(inputData, 'parsing input data');
  const walletAddress = inputData.userAddress.toLowerCase();
  const input = parse(inputData.inputData);
  console.log(`Processing input from: ${walletAddress}`);
  console.log(`Processing input string: ${inputData.inputData}`);
  console.log(`Input string parsed as: ${input.input}`);

  switch (input.input) {
    case 'submitGuess':
      return processSubmission(input, dbConn, randomnessGenerator, walletAddress);
    case 'scheduledData':
      if (!inputData.scheduled) return [];
      return processScheduled(input, walletAddress, dbConn);
    default:
      console.warn("Unexpected input", input);
      return [];
  }
}

async function processSubmission(
  input: SubmitGuess,
  dbConn: Pool,
  randomnessGenerator: Prando,
  walletAddress: string
): Promise<SQLUpdate[]> {
  const move: MatchMove = MatchMove.fromData(input.symbols, input.guess);

  console.log("Match move", JSON.stringify(move));

  const executor = initRoundExecutor(move, randomnessGenerator);
  const finalState = executor.endState();
  console.log("Final state", JSON.stringify(finalState));

  // handling achievements
  //todo: factor out to separate function?
  const achievementsResult = await getAchievements(walletAddress, dbConn);
  let achievementsUpdate: SQLUpdate[] = [];
  if ((achievementsResult as GetAchievementsError).error) {
    console.error((achievementsResult as GetAchievementsError).error)
  };
  if (!achievementsResult) {
    console.log(`Achievements not enabled for user ${walletAddress}`);
  } else {
    const achievements = achievementsResult as IGetAchievementsByOwnedResult;
    achievementsUpdate = await updateAchievements(achievements, walletAddress, dbConn);
  };
  
  // handling submission
  //todo: factor out to separate function?
  const params: IInsertSubmissionParams =
  {
    wallet_address: input.address,
    symbols: input.symbols,
    guess: input.guess,
    is_success: finalState.isGoodSoFar
  }
  return [[insertSubmission, params], ...achievementsUpdate]
}

async function processScheduled(
  input: ScheduledDataInput,
  walletAddress: string,
  dbConn: Pool
): Promise<SQLUpdate[]> {
  if (isAchievementNft(input)) {
    console.log("PE: got mint NFT");
    const achievements = await getAchievements(walletAddress, dbConn);
    if (achievements) {
      console.warn("No new state for NFT will be created: user already have achievements enabled or db is broken", achievements)
    }
    return [initAchievementsQuery(input)];
  }
  return [];
}

