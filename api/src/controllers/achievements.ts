import { Controller, Get, Query, Route, } from 'tsoa';
import { ISubmissionDataResult, submissionData, requirePool, getAchievements, IGetAchievementsByOwnedResult } from '@game/db';
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
      return { error: 'Achievements not found' }
    };

    return {
      contractAddress: result.contract_address,
      nftId: result.nft_id,
      record: JSON.parse(result.record)
    };
  }
}
