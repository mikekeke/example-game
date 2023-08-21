import { Controller, Get, Query, Route, ValidateError } from 'tsoa';
import { IGetSubmissionResult, getSubmission, requirePool } from '@game/db';
import { isLeft } from 'fp-ts/Either';
import { psqlNum } from '../validation.js';
import type { RoundExecutorData } from '@game/utils';
import { getBlockHeight } from 'paima-sdk/paima-db';

type Response = IGetSubmissionResult | Error;

interface Error {
  error: 'User submission not found'
}

@Route('user_submission')
export class USerSubmissionController extends Controller {
  @Get()
  public async get(@Query() wallet_address: string): Promise<Response> {
    const pool = requirePool();
    const [userSubmission] = await getSubmission.run({ address: wallet_address }, pool);
    if (!userSubmission) return {error: 'User submission not found'}
    return userSubmission;
  }
}

// @Route('user_submission')
// export class UserSubmissionController extends Controller {
//   @Get()
//   public async get(@Query() address: string): Promise<string> {
//     return userAddress;
//   }
// }

