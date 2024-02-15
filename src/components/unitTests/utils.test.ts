import { ColorsHexes, Directions } from '../types/gameTypes';
import {
  getColorsBg,
  calculateHexPosition,
  generateHexCoordinates,
  getNextCellIndex,
  calculateSizeOfHex,
} from '../utils';

const testData = [
  { q: -1, r: 0, s: 1, value: null },
  { q: -1, r: 1, s: 0, value: null },
  { q: 0, r: -1, s: 1, value: null },
  { q: 0, r: 0, s: -0, value: null },
  { q: 0, r: 1, s: -1, value: null },
  { q: 1, r: -1, s: 0, value: null },
  { q: 1, r: 0, s: -1, value: null },
];

describe('calculateHexPosition', () => {
  const center = { q: 0, r: 0, s: 0, value: null };
  const hexRadius = 120;
  const directionObjFirst = { q: -2, r: 0, s: 2, value: null };
  const directionObjMiddle = { q: 0, r: 0, s: 0, value: null };
  const directionObjLast = { q: 2, r: 0, s: -2, value: null };
  const resObjFirst = { x: -172.51226043386015, y: 99.6 };
  const resObjMiddle = { x: 0, y: -0 };
  const resObjLast = { x: 172.51226043386015, y: -99.6 };
  test('should correctly calculate positions for directionObjFirst', () => {
    expect(calculateHexPosition(directionObjFirst, hexRadius, center)).toEqual({
      x: resObjFirst.x,
      y: resObjFirst.y,
    });
  });

  test('should correctly calculate positions for directionObjMiddle', () => {
    expect(calculateHexPosition(directionObjMiddle, hexRadius, center)).toEqual({
      x: resObjMiddle.x,
      y: resObjMiddle.y,
    });
  });

  test('should correctly calculate positions for directionObjLast', () => {
    expect(calculateHexPosition(directionObjLast, hexRadius, center)).toEqual({
      x: resObjLast.x,
      y: resObjLast.y,
    });
  });

  test('should not be equal to a different position for directionObjMiddle', () => {
    expect(calculateHexPosition(directionObjMiddle, hexRadius, center)).not.toEqual({
      x: resObjMiddle.x + 1,
      y: resObjMiddle.y,
    });
  });
});

describe('getColorsBg', () => {
  const arrNums: number[] = [2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048];
  const {
    twoColor,
    fourColor,
    eightColor,
    sixteenColor,
    thirtyTwoColor,
    sixtyFourColor,
    oneHundredAndTwentyEightColor,
    twoHundredFiftySixColor,
    fiveHundredTwelveColor,
    oneThousandTwentyFourColor,
    twoThousandFortyEightColor,
  } = ColorsHexes;
  const arrColors = [
    twoColor,
    fourColor,
    eightColor,
    sixteenColor,
    thirtyTwoColor,
    sixtyFourColor,
    oneHundredAndTwentyEightColor,
    twoHundredFiftySixColor,
    fiveHundredTwelveColor,
    oneThousandTwentyFourColor,
    twoThousandFortyEightColor,
  ];

  arrNums.forEach((num, index) => {
    test(`should return correct color for ${num}`, () => {
      expect(getColorsBg(num)).toBe(arrColors[index]);
    });
  });
});

describe('generateHexCoordinates', () => {
  const size = 1;

  test('generateHexCoordinates should return the correct hex coordinates for 0', () => {
    expect(generateHexCoordinates(0)).toEqual([{ q: -0, r: 0, s: 0, value: null }]);
  });
  test('generateHexCoordinates should return the correct hex coordinates for a given size', () => {
    expect(generateHexCoordinates(size)).toEqual(testData);
  });

  test('generateHexCoordinates should handle edge cases', () => {
    expect(generateHexCoordinates(-1)).toEqual([]);
  });
});

describe('getNextCellIndex', () => {
  test('should return the correct index for an existing cell in the specified direction with offset', () => {
    const direction = Directions.downRight;
    const dataItem = testData[0];
    const num = 1;
    const expectedIndex = 2;
    expect(getNextCellIndex(direction, testData, dataItem, num)).toBe(expectedIndex);
  });
});

describe('calculateSizeOfHex', () => {
  test('should calculate size correctly for defaultSize 1, radius 4, and dividerParam 4', () => {
    const defaultSize = 1;
    const radius = 4;
    const dividerParam = 4;
    const expectedResult = 1;
    const result = calculateSizeOfHex(defaultSize, radius, dividerParam);
    expect(result).toBe(expectedResult);
  });

  test('should calculate size correctly for defaultSize 2, radius 4, and dividerParam 4', () => {
    const defaultSize = 2;
    const radius = 4;
    const dividerParam = 4;
    const expectedResult = 2;
    const result = calculateSizeOfHex(defaultSize, radius, dividerParam);
    expect(result).toBe(expectedResult);
  });
});
