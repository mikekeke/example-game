import type { Pool } from 'pg';

import parse from './parser.js';
import type Prando from 'paima-sdk/paima-prando';
import type { SubmittedChainData } from 'paima-sdk/paima-utils';
import type { SQLUpdate } from 'paima-sdk/paima-db';
import { insertSubmission, IInsertSubmissionParams, getAchievementsByOwned, IGetAchievementsByOwnedResult, getAchievements, getSubmissions } from '@game/db';
import { AchievementNftMint, ScheduledDataInput, SubmitGuess, isAchievementNft } from './types.js';
import { MatchMove, initRoundExecutor } from '@game/game-logic';

import { initAchievementsQuery, updateAchievementsRecord } from './updates.js';
import { getNftOwner } from 'paima-sdk/paima-utils-backend';

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
      return processScheduled(input, dbConn);
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

  const achievementsUpdate: SQLUpdate[] =
    await updateAchievementsRecord(walletAddress, finalState, dbConn);

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
  dbConn: Pool
): Promise<SQLUpdate[]> {
  if (isAchievementNft(input)) {
    console.log("PE: got mint NFT");
    return initAchievement(input, dbConn);
  }
  return [];
}

async function initAchievement(
  input: AchievementNftMint,
  dbConn: Pool
): Promise<SQLUpdate[]> {
  const walletAddress = await getNftOwner(
    dbConn,
    "Achievements NFT contract", //todo: get from CDE
    BigInt(input.tokenId)
  );
  if (!walletAddress) {
    console.warn(`
        WARNING!
        Owner of NFT ${input.tokenId} not found in the database.
        This achievement NFT is not tracked by the node, no state will be created.
       `);
    return [];
  }
  const achievements = await getAchievements(walletAddress, dbConn);
  if (achievements) {
    console.warn(`
        WARNING!
        Although mint input is processed by the game node, 
        user already have achievements instance in the database associated with another NFT.
        So no state for the new NFT will be created.`);
    return [];
  }

  

  return initAchievementsQuery(input, walletAddress, dbConn);
}
