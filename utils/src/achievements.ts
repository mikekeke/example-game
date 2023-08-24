
export type Achievement = string;

export interface Achievements {
  contractAddress: string,
  nftId: string,
  achievements: Achievement[]
}

export interface AchievementsRepo {
  getAchievements(walletAddress: string): Promise<Achievements>;
  updateAchievements(walletAddress: string, achievement: Achievement): Promise<void>;
}

export class DummyAchievements implements AchievementsRepo {

  private achievements: Achievement[] = [];

  async getAchievements(walletAddress: string): Promise<Achievements> {
    return {
      contractAddress: "some NFT contract address",
      nftId: "1",
      achievements: this.achievements
    };
  }
  async updateAchievements(walletAddress: string, achievement: Achievement): Promise<void> {
    this.achievements.push(achievement);
  }

}
