/** Types generated for queries found in "src/queries/insert.sql" */
import { PreparedQuery } from '@pgtyped/query';

/** 'InsertSubmission' parameters type */
export interface IInsertSubmissionParams {
  guess: string;
  symbols: string;
  user_address: string;
}

/** 'InsertSubmission' return type */
export type IInsertSubmissionResult = void;

/** 'InsertSubmission' query type */
export interface IInsertSubmissionQuery {
  params: IInsertSubmissionParams;
  result: IInsertSubmissionResult;
}

const insertSubmissionIR: any = {"usedParamSet":{"user_address":true,"symbols":true,"guess":true},"params":[{"name":"user_address","required":true,"transform":{"type":"scalar"},"locs":[{"a":74,"b":87}]},{"name":"symbols","required":true,"transform":{"type":"scalar"},"locs":[{"a":92,"b":100}]},{"name":"guess","required":true,"transform":{"type":"scalar"},"locs":[{"a":105,"b":111}]}],"statement":"INSERT INTO submissions (\n  user_address,\n  symbols,\n  guess\n) VALUES (\n  :user_address!,\n  :symbols!,\n  :guess!\n)"};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO submissions (
 *   user_address,
 *   symbols,
 *   guess
 * ) VALUES (
 *   :user_address!,
 *   :symbols!,
 *   :guess!
 * )
 * ```
 */
export const insertSubmission = new PreparedQuery<IInsertSubmissionParams,IInsertSubmissionResult>(insertSubmissionIR);


