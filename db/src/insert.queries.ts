/** Types generated for queries found in "src/queries/insert.sql" */
import { PreparedQuery } from '@pgtyped/query';

/** 'InsertSubmission' parameters type */
export interface IInsertSubmissionParams {
  guess: string;
  is_success: boolean;
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

const insertSubmissionIR: any = {"usedParamSet":{"user_address":true,"symbols":true,"guess":true,"is_success":true},"params":[{"name":"user_address","required":true,"transform":{"type":"scalar"},"locs":[{"a":88,"b":101}]},{"name":"symbols","required":true,"transform":{"type":"scalar"},"locs":[{"a":106,"b":114}]},{"name":"guess","required":true,"transform":{"type":"scalar"},"locs":[{"a":119,"b":125}]},{"name":"is_success","required":true,"transform":{"type":"scalar"},"locs":[{"a":130,"b":141}]}],"statement":"INSERT INTO submissions (\n  user_address,\n  symbols,\n  guess,\n  is_success\n) VALUES (\n  :user_address!,\n  :symbols!,\n  :guess!,\n  :is_success!\n) \nON CONFLICT (user_address)\nDO UPDATE SET \nsymbols = EXCLUDED.symbols,\nguess = EXCLUDED.guess,\nis_success = EXCLUDED.is_success"};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO submissions (
 *   user_address,
 *   symbols,
 *   guess,
 *   is_success
 * ) VALUES (
 *   :user_address!,
 *   :symbols!,
 *   :guess!,
 *   :is_success!
 * ) 
 * ON CONFLICT (user_address)
 * DO UPDATE SET 
 * symbols = EXCLUDED.symbols,
 * guess = EXCLUDED.guess,
 * is_success = EXCLUDED.is_success
 * ```
 */
export const insertSubmission = new PreparedQuery<IInsertSubmissionParams,IInsertSubmissionResult>(insertSubmissionIR);


