
export const ACHIEVEMENTS_CDE = "" 
export type Achievement = string;

export interface Achievements {
  contractAddress: string,
  nftId: string,
  achievements: Achievement[]
}

