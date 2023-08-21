import type { Pool } from 'pg';

import parse from './parser.js';
import type Prando from 'paima-sdk/paima-prando';
import type { SubmittedChainData } from 'paima-sdk/paima-utils';
import type { SQLUpdate } from 'paima-sdk/paima-db';
// import { submitGuess } from './persist/global.js';
import { insertSubmission, IInsertSubmissionParams } from '@game/db';
import { SubmitGuess } from './types.js';
import { MatchMove, initRoundExecutor } from '@game/game-logic';
// import { submitIncrement, submitMove, joinWorld } from './persist/global.js';

export default async function (
  inputData: SubmittedChainData,
  blockHeight: number,
  randomnessGenerator: Prando,
  dbConn: Pool
): Promise<SQLUpdate[]> {
  console.log(inputData, 'parsing input data');
  const user = inputData.userAddress.toLowerCase();
  const input = parse(inputData.inputData);
  console.log(`Processing input string: ${inputData.inputData}`);
  console.log(`Input string parsed as: ${input.input}`);
  // return [];
  // throw new Error("State transition end")

  switch (input.input) {
    case 'submitGuess':
      const res = processSubmission(input, dbConn, randomnessGenerator);
      return [res];
    default:
      console.warn("Unexpected input", input);
      return [];
  }
}

function processSubmission(input: SubmitGuess, dbConn: Pool, randomnessGenerator: Prando): SQLUpdate {
  const move: MatchMove = MatchMove.fromData(input.symbols, input.guess);

  console.log("Match move", JSON.stringify(move));

  const executor = initRoundExecutor(move, randomnessGenerator);
  const finalState = executor.endState();
  console.log("Final state", JSON.stringify(finalState));
  const params: IInsertSubmissionParams =
  {
    user_address: input.address,
    symbols: input.symbols,
    guess: input.guess,
    is_success: finalState.isGoodSoFar
  }
  return [insertSubmission, params]
}