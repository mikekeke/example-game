import type { Pool } from 'pg';
import parse from './parser.js';
import type Prando from 'paima-sdk/paima-prando';
import type { SubmittedChainData } from 'paima-sdk/paima-utils';
import type { SQLUpdate } from 'paima-sdk/paima-db';
import { insertSubmission, IInsertSubmissionParams } from '@game/db';
import { ScheduledDataInput, SubmitGuess, isAchievementNft } from './types.js';
import { MatchMove, initRoundExecutor } from '@game/game-logic';
import { initAchievement, updateAchievementsRecord } from './updates.js';

export default async function (
  inputData: SubmittedChainData,
  _blockHeight: number,
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
    console.log("Processing achievement NFT input");
    return initAchievement(input, dbConn);
  }
  return [];
}

