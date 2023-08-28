
export const ACHIEVEMENTS_CDE = "" 

export interface Achievements {
  contractAddress: string,
  nftId: string,
  record: AchievementsRecord
}

export interface AchievementsRecord {
  gamesPlayed: number,
  winStreak: number
}

