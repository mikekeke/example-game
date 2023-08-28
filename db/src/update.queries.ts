/** Types generated for queries found in "src/queries/update.sql" */
import { PreparedQuery } from '@pgtyped/query';

/** 'UpdateAchievements' parameters type */
export interface IUpdateAchievementsParams {
  nft_id: string;
  record: string;
}

/** 'UpdateAchievements' return type */
export type IUpdateAchievementsResult = void;

/** 'UpdateAchievements' query type */
export interface IUpdateAchievementsQuery {
  params: IUpdateAchievementsParams;
  result: IUpdateAchievementsResult;
}

const updateAchievementsIR: any = {"usedParamSet":{"record":true,"nft_id":true},"params":[{"name":"record","required":true,"transform":{"type":"scalar"},"locs":[{"a":34,"b":41}]},{"name":"nft_id","required":true,"transform":{"type":"scalar"},"locs":[{"a":58,"b":65}]}],"statement":"UPDATE achievements \nSET record = :record!\nWHERE nft_id = :nft_id!"};

/**
 * Query generated from SQL:
 * ```
 * UPDATE achievements 
 * SET record = :record!
 * WHERE nft_id = :nft_id!
 * ```
 */
export const updateAchievements = new PreparedQuery<IUpdateAchievementsParams,IUpdateAchievementsResult>(updateAchievementsIR);


