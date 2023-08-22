import { Controller, Get, Query, Route, } from 'tsoa';
import { IGetSubmissionIdsResult, getSubmissionIds, requirePool } from '@game/db';

type Response = IGetSubmissionIdsResult[] | Error;

interface Error {
  error: 'Submissions not found'
}

@Route('submission_ids')
export class SubmissionIdsController extends Controller {
  @Get()
  public async get(@Query() wallet_address: string): Promise<Response> {
    const pool = requirePool();
    const ids = await getSubmissionIds.run(
      { wallet_address: wallet_address },
      pool);
    if (ids.length == 0) return { error: 'Submissions not found' }
    return ids;
  }
}
