import { sortCoordinatesClockwise } from './sort-coordinates';

describe('sortCoordinatesClockwise', () => {
  it('should handle a single point', () => {
    const points: [number, number][] = [[0, 0]];

    const sortedPoints = sortCoordinatesClockwise(points);

    expect(sortedPoints).toEqual([[0, 0]]);
  });

  it('should handle two points', () => {
    const points: [number, number][] = [
      [0, 0],
      [1, 1],
    ];

    const sortedPoints = sortCoordinatesClockwise(points);

    expect(sortedPoints).toEqual([
      [0, 0],
      [1, 1],
    ]);
  });

  it('should handle collinear points', () => {
    const points: [number, number][] = [
      [0, 0],
      [1, 1],
      [2, 2],
    ];

    const sortedPoints = sortCoordinatesClockwise(points);

    expect(sortedPoints).toEqual([
      [0, 0],
      [1, 1],
      [2, 2],
    ]);
  });
});
