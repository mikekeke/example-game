import type { Pool } from 'pg';

import parse from './parser.js';
import type Prando from 'paima-sdk/paima-prando';
import type { SubmittedChainData } from 'paima-sdk/paima-utils';
import type { SQLUpdate } from 'paima-sdk/paima-db';
// import { submitGuess } from './persist/global.js';
import { insertSubmission, IInsertSubmissionParams } from '@game/db';
import { ScheduledDataInput, SubmitGuess, isAchievementNft } from './types.js';
import { MatchMove, initRoundExecutor } from '@game/game-logic';
import { DummyAchievements } from '@game/utils';
// import { submitIncrement, submitMove, joinWorld } from './persist/global.js';

export default async function (
  inputData: SubmittedChainData,
  blockHeight: number,
  randomnessGenerator: Prando,
  dbConn: Pool
): Promise<SQLUpdate[]> {
  console.log(inputData, 'parsing input data');
  const walletAddress = inputData.userAddress.toLowerCase();
  const input = parse(inputData.inputData);
  console.log(`Processing input string: ${inputData.inputData}`);
  console.log(`Input string parsed as: ${input.input}`);

  switch (input.input) {
    case 'submitGuess':
      const res = await processSubmission(input, dbConn, randomnessGenerator, walletAddress);
      return [res];
    case 'scheduledData':
      if (!inputData.scheduled) return [];
      return processScheduled(input);
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
): Promise<SQLUpdate> {
  const move: MatchMove = MatchMove.fromData(input.symbols, input.guess);

  console.log("Match move", JSON.stringify(move));

  const executor = initRoundExecutor(move, randomnessGenerator);
  const finalState = executor.endState();
  console.log("Final state", JSON.stringify(finalState));

  const achievementsRepo = new DummyAchievements();
  const achievements = await achievementsRepo.getAchievements(walletAddress);
  //todo
  // if (achievements) {
  //   await updateAchievements()
  // }

  const params: IInsertSubmissionParams =
  {
    wallet_address: input.address,
    symbols: input.symbols,
    guess: input.guess,
    is_success: finalState.isGoodSoFar
  }
  return [insertSubmission, params]
}

function processScheduled(input: ScheduledDataInput): SQLUpdate[] | PromiseLike<SQLUpdate[]> {
  if (isAchievementNft(input)) {
    console.log("PE: got mint NFT");

  }
  return [];
}
