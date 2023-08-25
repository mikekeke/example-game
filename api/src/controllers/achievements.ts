import { Controller, Get, Query, Route, } from 'tsoa';
import { ISubmissionDataResult, submissionData, requirePool } from '@game/db';
import { Achievements, getAchievements } from '@game/utils';

type Response = Achievements | Error;

interface Error {
  error: 'Achievements not found'
}

@Route('achievements')
export class AchievementController extends Controller {
  @Get()
  public async get(@Query() wallet_address: string): Promise<Response> {
    // const pool = requirePool();
    // const res = await getAchievements(wallet_address, pool);
    return {error: 'Achievements not found'};
  }
}

