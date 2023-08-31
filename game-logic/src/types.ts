import { fromOnChainRepr } from "@game/utils";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export class TickEvent {
  isCorrect: boolean;
  symbol: string;
  onChainCode: string;
  morzeCode: string;

  private constructor(isCorrect: boolean, symbol: string, onChainCode: string, morzeCode: string) {
    this.isCorrect = isCorrect;
    this.symbol = symbol;
    this.onChainCode = onChainCode;
    this.morzeCode = morzeCode;
  }

  public static new(isCorrect: boolean, symbol: string, onChainCode: string): TickEvent {
    return new TickEvent(isCorrect, symbol, onChainCode, fromOnChainRepr(onChainCode));
  }
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

export function getPrettyCodes(state: MatchState): string[] {
  return state.codesLeft.map(fromOnChainRepr);
}

export function getNextPair(state: MatchState): [string, string] | null {
  if (!state.symbolsLeft.length) return null;
  if (!state.codesLeft.length) return null;
  return [state.symbolsLeft.charAt(0), state.codesLeft[0]]
}

export class MatchMove {
  symbols: string;
  codes: string[];
  // This field is required for data that represents moves.
  // It is always 1 in current example.
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
