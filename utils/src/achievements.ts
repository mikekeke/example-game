import type { Pool } from 'pg';
import { getOwnedNfts } from 'paima-sdk/paima-utils-backend';
import { getAchievementsByOwned } from '@game/db';

export type Achievement = string;

export interface Achievements {
  contractAddress: string,
  nftId: string,
  achievements: Achievement[]
}

export async function getAchievements(
  walletAddress: string,
  readonlyDBConn: Pool
): Promise<Achievements | undefined> {
  const ownedNftIds =
    await getOwnedNfts(
      readonlyDBConn,
      "Test NFT contract",
      walletAddress).then(r => r.map((x) => x.toString()));

  console.log("owned", ownedNftIds)

  if (ownedNftIds.length > 0) {

    //todo: check if rest is empty
    const [result, ...rest] = await getAchievementsByOwned.run(
      { nft_ids: ownedNftIds },
      readonlyDBConn
    );
    console.log("Achievements", result)
    return {
      contractAddress: result.contract_address,
      nftId: result.nft_id,
      achievements: result.achievements
    };
  }
  return undefined;
}

// export interface AchievementsRepo {
//   getAchievements(walletAddress: string): Promise<Achievements>;
//   updateAchievements(walletAddress: string, achievement: Achievement): Promise<void>;
// }

// export class DummyAchievements implements AchievementsRepo {

//   private achievements: Achievement[] = [];

//   async getAchievements(walletAddress: string): Promise<Achievements> {
//     return {
//       contractAddress: "some NFT contract address",
//       nftId: "1",
//       achievements: this.achievements
//     };
//   }
//   async updateAchievements(walletAddress: string, achievement: Achievement): Promise<void> {
//     this.achievements.push(achievement);
//   }

// }
