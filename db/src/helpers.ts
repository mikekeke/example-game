import type { Pool } from 'pg';
import { getOwnedNfts } from 'paima-sdk/paima-utils-backend';
import { IGetAchievementsByOwnedResult, getAchievementsByOwned } from './select.queries';


export interface GetAchievementsError {
  error: 'More than one NFT owned - DB is broken'
}

export type AchievementsResult
  = IGetAchievementsByOwnedResult
  | GetAchievementsError
  | undefined

export async function getAchievements(
  walletAddress: string,
  readonlyDBConn: Pool
): Promise<AchievementsResult> {
  const ownedNftIds =
    await getOwnedNfts(
      readonlyDBConn,
      "Achievements NFT contract", //todo: get from CDE
      walletAddress).then(r => r.map((x) => x.toString()));

  console.log("owned", ownedNftIds)

  if (ownedNftIds.length > 0) {
    const [result, ...rest] = await getAchievementsByOwned.run(
      { nft_ids: ownedNftIds },
      readonlyDBConn
    );
    if (rest.length != 0) return { error: 'More than one NFT owned - DB is broken' }
    console.log("Achievements", result)
    return result;
  }
  return undefined;
}