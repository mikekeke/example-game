import parse from './parser';
import { AchievementNftMint, ScheduledDataInput, isAchievementNft } from './types';

describe('Input parsing', () => {

  test('parses submitGuess', () => {
    //todo: remove normalization, it works as is looks like
    const parsed = parse('s|*cf578a945dc50aa74fae976d4197f0d6d0a1d41d|A|01');
    console.log("parsed submitGuess", parsed)
    expect(parsed.input).toBe('submitGuess');
  });

  test('parses nftMint', () => {
    const parsed = parse('nftmint|0x95Da09050FdB318C2C9D0B142F07877cB5bf5E22|6|fire') as ScheduledDataInput;
    console.log("parsed", parsed)
    expect(parsed.input).toBe('scheduledData');
    expect(isAchievementNft(parsed)).toBe(true);
  });
});
