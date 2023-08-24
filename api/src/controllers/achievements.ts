import { Controller, Get, Query, Route, } from 'tsoa';
import { ISubmissionDataResult, submissionData, requirePool } from '@game/db';
import { Achievements, AchievementsRepo, DummyAchievements } from '@game/utils';

type Response = Achievements | Error;

interface Error {
  error: 'Achievements not found'
}

@Route('achievements')
export class AchievementController extends Controller {
  @Get()
  public async get(@Query() wallet_address: string): Promise<Response> {
    return initRepo().getAchievements(wallet_address);
  }
}

function initRepo(): AchievementsRepo  {
  return new DummyAchievements();
}
