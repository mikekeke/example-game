import parse from './parser';

describe('Input parsing', () => {

  test('parses joinWorld', () => {
    const parsed = parse('s|*cf578a945dc50aa74fae976d4197f0d6d0a1d41d|A|01');
    expect(parsed.input).toBe('submitGuess');
    // console.log(parsed)
  });
});
