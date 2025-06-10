import { TextLimitPipe } from './text-limit-pipe';

describe('CapitalizePipe', () => {
  it('create an instance', () => {
    const pipe = new TextLimitPipe();
    expect(pipe).toBeTruthy();
  });
});