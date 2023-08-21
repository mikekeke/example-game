import type { FailedResult, Result } from 'paima-sdk/paima-mw-core';
import { buildBackendQuery, PaimaMiddlewareErrorCode } from 'paima-sdk/paima-mw-core';

import type { RoundExecutorData, } from '@game/utils';

import { buildEndpointErrorFxn, MiddlewareErrorCode } from '../errors';
import type { RoundExecutor } from '../types';
import { initRoundExecutor, MatchMove, type MatchState, type TickEvent } from '@game/game-logic';
import { IGetSubmissionResult } from '@game/db';
import Prando from 'paima-sdk/paima-prando';

export const queryEndpoints = {
  getRoundExecutor,
  getUserSubmission,
  testQuery,
};

async function getRoundExecutor(
  userAddress: string,
): Promise<Result<RoundExecutor<MatchState, TickEvent>>> {
  const errorFxn = buildEndpointErrorFxn('getRoundExecutor');

  const address =
    userAddress.startsWith("0x")
      ? userAddress.slice(2, userAddress.length)
      : userAddress;

  // Retrieve data:
  let res: Response;
  try {
    const query = backendQueryRoundExecutor(address);
    res = await fetch(query);
  } catch (err) {
    return errorFxn(PaimaMiddlewareErrorCode.ERROR_QUERYING_BACKEND_ENDPOINT, err);
  }

  let data: RoundExecutorData;
  try {
    data = (await res.json()) as RoundExecutorData;
  } catch (err) {
    return errorFxn(PaimaMiddlewareErrorCode.INVALID_RESPONSE_FROM_BACKEND, err);
  }

  // Process data:
  try {
    const executor = buildRoundExecutor(data, 1);
    return {
      success: true,
      result: executor,
    };
  } catch (err) {
    return errorFxn(MiddlewareErrorCode.UNABLE_TO_BUILD_EXECUTOR, err);
  }
}

async function getUserSubmission(
  userAddress: string,
): Promise<Result<IGetSubmissionResult>> {
  const wallet_address = // todo: clear address at frontend side
    userAddress.startsWith("0x")
      ? userAddress.slice(2, userAddress.length)
      : userAddress;
  const errorFxn = buildEndpointErrorFxn('getUserSubmission');
  const endpoint = 'user_submission';
  const options = {
    wallet_address,
  };

  
  const query = buildBackendQuery(endpoint, options);
  console.log("Submission query", query) 
  const res = await fetch(query); 
  const data = (await res.json()) as IGetSubmissionResult;
  return {
    success: true,
    result: data,
  };
}

async function testQuery(): Promise<string> {
  return "test query result"
}

function buildRoundExecutor(
  submission: IGetSubmissionResult,
  round: number
): RoundExecutor<MatchState, TickEvent> {
  const randomnessGenerator = new Prando(12);
  const userMove: MatchMove = MatchMove.fromData(submission.symbols, submission.guess);
  return initRoundExecutor(userMove, randomnessGenerator);
}

export function backendQueryRoundExecutor(userAddress: string): string {
  const endpoint = 'round_executor';
  const options = {
    userAddress,
  };
  return buildBackendQuery(endpoint, options);
}
