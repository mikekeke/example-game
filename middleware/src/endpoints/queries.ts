import type { Result } from 'paima-sdk/paima-mw-core';
import { buildBackendQuery, PaimaMiddlewareErrorCode } from 'paima-sdk/paima-mw-core';
import { buildEndpointErrorFxn, MiddlewareErrorCode } from '../errors';
import type { RoundExecutor } from '../types';
import { initRoundExecutor, MatchMove, type MatchState, type TickEvent } from '@game/game-logic';
import Prando from 'paima-sdk/paima-prando';
import { Achievements } from '@game/utils';
import { IGetSubmissionResult } from '@game/db';

export const queryEndpoints = {
  getRoundExecutor,
  getSubmissionsData,
  getAchievements,
};

// There is actually function `getActiveAddress()` available in Paima SDK
// but it was decided to pass address to endpoint from frontend
async function getRoundExecutor(
  walletAddress: string,
  submissionId: number
): Promise<Result<RoundExecutor<MatchState, TickEvent>>> {
  const errorFxn = buildEndpointErrorFxn('getRoundExecutor');

  const query = buildBackendQuery(
    'user_submission',
    {
      wallet_address: walletAddress,
      submission_id: submissionId
    });

  const data: Result<IGetSubmissionResult> =
    await getData('getRoundExecutor', query);
  if (!data.success) return data;

  try {
    const executor = buildRoundExecutor(data.result);
    return {
      success: true,
      result: executor,
    };
  } catch (err) {
    return errorFxn(MiddlewareErrorCode.UNABLE_TO_BUILD_EXECUTOR, err);
  }
}

export interface SubmissionData {
  submission_id: number;
  symbols: string;
}

async function getSubmissionsData(walletAddress: string): Promise<Result<SubmissionData[]>> {
  const query = buildBackendQuery(
    'submissions_data',
    { wallet_address: walletAddress });

  const data: Result<SubmissionData[]> =
    await getData('getSubmissionsData', query);
  return data;
}

async function getAchievements(walletAddress: string): Promise<Result<Achievements>> {
  const query = buildBackendQuery(
    'achievements',
    { wallet_address: walletAddress });

  const data: Result<Achievements> =
    await getData('getAchievements', query);
  return data;
}

function buildRoundExecutor(
  submission: IGetSubmissionResult,
): RoundExecutor<MatchState, TickEvent> {
  // No randomness source is needed for the current game. Creating just some dummy here.
  const randomnessGenerator = new Prando(1);
  const userMove: MatchMove = MatchMove.fromData(submission.symbols, submission.guess);
  return initRoundExecutor(userMove, randomnessGenerator);
}

async function getData<T>(
  endpoint: string,
  query: string,
): Promise<Result<T>> {
  const errorFxn = buildEndpointErrorFxn(endpoint);

  let res: Response;
  try {
    res = await fetch(query);
  } catch (err) {
    return errorFxn(PaimaMiddlewareErrorCode.ERROR_QUERYING_BACKEND_ENDPOINT, err);
  }

  try {
    const data = (await res.json()) as T;
    return {
      success: true,
      result: data,
    };
  } catch (err) {
    return errorFxn(PaimaMiddlewareErrorCode.INVALID_RESPONSE_FROM_BACKEND, err);
  }
}
