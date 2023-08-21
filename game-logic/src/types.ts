// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface TickEvent {
  isCorrect: boolean,
  symbol: string,
  code: string
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface MatchEnvironment { }

export interface PlayerInfo {
  wallet: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface MatchState {
  isGoodSoFar: boolean,
  symbolsLeft: string,
  codesLeft: string[]
}

export function getNextPair(state: MatchState): [string, string] | null {
  if (!state.symbolsLeft.length) return null;
  if (!state.codesLeft.length) return null;
  return [state.symbolsLeft.charAt(0), state.codesLeft[0]]
}

export class MatchMove {
  symbols: string;
  codes: string[];
  round: number;

  private constructor(symbols: string, codes: string, round: number) {
    this.symbols = symbols;
    this.codes = codes.split("+");
    this.round = round;
  }

  public static fromData(symbols: string, codes: string): MatchMove {
    return new MatchMove(symbols, codes, 1);
  }

};
