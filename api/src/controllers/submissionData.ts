import { Controller, Get, Query, Route, } from 'tsoa';
import { ISubmissionDataResult, submissionData, requirePool } from '@game/db';

type Response = ISubmissionDataResult[] | Error;

interface Error {
  error: 'Submissions not found'
}

@Route('submissions_data')
export class SubmissionIdsController extends Controller {
  @Get()
  public async get(@Query() wallet_address: string): Promise<Response> {
    const pool = requirePool();
    const data = await submissionData.run(
      { wallet_address: wallet_address },
      pool);
    if (data.length == 0) return { error: 'Submissions not found' }
    return data;
  }
}
