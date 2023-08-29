import type { Pool } from 'pg';
import { getOwnedNfts } from 'paima-sdk/paima-utils-backend';
import { IGetAchievementsByOwnedResult, getAchievementsByOwned } from './select.queries';

export async function getAchievements(
  achievementsCde: string,
  walletAddress: string,
  readonlyDBConn: Pool
): Promise<IGetAchievementsByOwnedResult | undefined> {
  const ownedNftIds =
    await getOwnedNfts(
      readonlyDBConn,
      achievementsCde,
      walletAddress).then(r => r.map((x) => x.toString()));

  console.log("Owned NFTs", ownedNftIds)
  if (ownedNftIds.length == 0) {
    return undefined;
  }

  const [result] = await getAchievementsByOwned.run(
    { nft_ids: ownedNftIds },
    readonlyDBConn
  );
  console.log("Achievements:", result)
  return result;
}