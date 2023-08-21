import { Controller, Get, Query, Route, ValidateError } from 'tsoa';
import { getSubmission, requirePool } from '@game/db';
import { isLeft } from 'fp-ts/Either';
import { psqlNum } from '../validation.js';
import type { RoundExecutorData } from '@game/utils';
import { getBlockHeight } from 'paima-sdk/paima-db';

type Response = RoundExecutorData | Error;

interface Error {
  error: 'User submission not found'
}

@Route('round_executor')
export class RoundExecutorController extends Controller {
  @Get()
  public async get(@Query() userAddress: string): Promise<Response> {
    const pool = requirePool();
    const [userSubmission] = await getSubmission.run({ address: userAddress }, pool);
    if (!userSubmission) return {error: 'User submission not found'}
    return userSubmission;
  }
}
