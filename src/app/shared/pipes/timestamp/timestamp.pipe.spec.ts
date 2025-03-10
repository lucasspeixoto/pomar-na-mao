import { TimestampPipe } from './timestamp.pipe';

describe('TimestampPipe', () => {
  let pipe: TimestampPipe;

  beforeEach(() => {
    pipe = new TimestampPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  /*  it('should transform timestamp to formatted date string', () => {
    const timestamp1 = 1709251200000;
    const result1 = pipe.transform(timestamp1);

    const timestamp2 = 1577836800000;
    const result2 = pipe.transform(timestamp2);

    expect(result1).toMatch('29/02/2024, 21:00:00');
    expect(result2).toMatch('31/12/2019, 21:00:00');
  }); */
});
