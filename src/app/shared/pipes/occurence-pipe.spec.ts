/* tslint:disable:no-unused-variable */

import { EpochToTimePipe } from './epoch-to-time-pipe';

describe('EpochToTime', () => {
  it('create an instance', () => {
    const pipe = new EpochToTimePipe();
    expect(pipe).toBeTruthy();
  });
});

it('should return "Tempo inválido!" for null timestamp', () => {
  const pipe = new EpochToTimePipe();
  expect(pipe.transform(0)).toBe('Tempo inválido!');
});

it('should format timestamp to time string', () => {
  const pipe = new EpochToTimePipe();

  // Test case 1: 10:30:45
  const timestamp1 = new Date(2023, 0, 1, 10, 30, 45).getTime();
  expect(pipe.transform(timestamp1)).toBe('10h:30m:45s');

  // Test case 2: 00:05:09 (testing padding)
  const timestamp2 = new Date(2023, 0, 1, 0, 5, 9).getTime();
  expect(pipe.transform(timestamp2)).toBe('00h:05m:09s');

  // Test case 3: 23:59:59 (edge case)
  const timestamp3 = new Date(2023, 0, 1, 23, 59, 59).getTime();
  expect(pipe.transform(timestamp3)).toBe('23h:59m:59s');
});
