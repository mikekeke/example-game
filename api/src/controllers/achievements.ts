import { Controller, Get, Query, Route, } from 'tsoa';
import { ISubmissionDataResult, submissionData, requirePool, getAchievements, GetAchievementsError, IGetAchievementsByOwnedResult } from '@game/db';
import { Achievements } from '@game/utils';
import e from 'express';

type Response = Achievements | Error;

interface Error {
  error: string
}

@Route('achievements')
export class AchievementController extends Controller {
  @Get()
  public async get(@Query() wallet_address: string): Promise<Response> {
    const pool = requirePool();
    const result = await getAchievements(wallet_address, pool);

    if (!result) {
      return { error: "Achievements not found" }
    };

    if ((result as GetAchievementsError).error) {
      return { error: (result as GetAchievementsError).error }
    };

    const achievements = result as IGetAchievementsByOwnedResult;
    return {
      contractAddress: achievements.contract_address,
      nftId: achievements.nft_id,
      achievements: achievements.achievements
    };
  }
}
