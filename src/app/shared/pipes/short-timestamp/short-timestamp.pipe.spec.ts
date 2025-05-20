import { ShortTimestampPipe } from './short-timestamp.pipe';

describe('ShortTimestampPipe', () => {
  let pipe: ShortTimestampPipe;

  beforeEach(() => {
    pipe = new ShortTimestampPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });
});
