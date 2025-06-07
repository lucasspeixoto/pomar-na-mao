import { TimestampPipe } from './timestamp-pipe';

describe('TimestampPipe', () => {
  let pipe: TimestampPipe;

  beforeEach(() => {
    pipe = new TimestampPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });
});
