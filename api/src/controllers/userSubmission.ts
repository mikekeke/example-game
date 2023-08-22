import { Controller, Get, Query, Route } from 'tsoa';
import { IGetSubmissionResult, getSubmission, requirePool } from '@game/db';

type Response = IGetSubmissionResult | Error;

interface Error {
  error: 'User submission not found'
}

@Route('user_submission')
export class UserSubmissionController extends Controller {
  @Get()
  public async get(
    @Query() wallet_address: string,
    @Query() submission_id: number
  ): Promise<Response> {
    const pool = requirePool();
    const [userSubmission] = await getSubmission.run(
      {
        wallet_address: wallet_address,
        submission_id: submission_id
      },
      pool
    );
    if (!userSubmission) return { error: 'User submission not found' }
    return userSubmission;
  }
}
