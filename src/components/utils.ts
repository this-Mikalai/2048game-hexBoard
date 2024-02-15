import { AnyObject, CenterCoordinates, ColorsHexes, Directions, Hex, StatusOfGame } from './types/gameTypes';

export const calculateHexPosition = (directionObj: Hex, hexRadius: number, center: CenterCoordinates, scale = 0.83) => {
  const q = center.q + directionObj.q;
  const r = center.r + directionObj.r;

  const x = ((q * hexRadius * Math.sqrt(3)) / 2) * scale;
  const y = (-r - q / 2) * hexRadius * scale;

  return { x, y };
};

export const getColorsBg = (num: number) => {
  const colorMap: { [key: number]: string } = {
    2: ColorsHexes.twoColor,
    4: ColorsHexes.fourColor,
    8: ColorsHexes.eightColor,
    16: ColorsHexes.sixteenColor,
    32: ColorsHexes.thirtyTwoColor,
    64: ColorsHexes.sixtyFourColor,
    128: ColorsHexes.oneHundredAndTwentyEightColor,
    256: ColorsHexes.twoHundredFiftySixColor,
    512: ColorsHexes.fiveHundredTwelveColor,
    1024: ColorsHexes.oneThousandTwentyFourColor,
    2048: ColorsHexes.twoThousandFortyEightColor,
  };

  return colorMap[num];
};

export const generateHexCoordinates = (size: number) => {
  const hexagons = [];

  for (let q = -size; q <= size; q++) {
    for (let r = Math.max(-size, -q - size); r <= Math.min(size, -q + size); r++) {
      const s = -q - r;
      hexagons.push({ q, r, s, value: null });
    }
  }

  return hexagons;
};

export const getNextCellIndex = (direction: Directions, data: Hex[], dataItem: Hex, num = 1) => {
  const { q, r, s } = dataItem;
  let targetCellIndex = -1;

  switch (direction) {
    case Directions.downRight:
      targetCellIndex = data.findIndex((el) => el.q === q + num && el.r === r - num && el.s === s);
      break;
    case Directions.upLeft:
      targetCellIndex = data.findIndex((el) => el.q === q - num && el.r === r + num && el.s === s);
      break;
    case Directions.bottom:
      targetCellIndex = data.findIndex((el) => el.q === q && el.r === r - num && el.s === s + num);
      break;
    case Directions.top:
      targetCellIndex = data.findIndex((el) => el.q === q && el.r === r + num && el.s === s - num);
      break;
    case Directions.upRight:
      targetCellIndex = data.findIndex((el) => el.q === q + num && el.r === r && el.s === s - num);
      break;
    case Directions.downLeft:
      targetCellIndex = data.findIndex((el) => el.q === q - num && el.r === r && el.s === s + num);
      break;
    default:
      return -1;
  }

  return targetCellIndex;
};

export const areMovesAvailable = (data: Hex[], setStatus: (status: StatusOfGame) => void) => {
  const isHexagonFilled = data.every((cell) => cell.value !== null);
  if (isHexagonFilled) {
    for (const cell of data) {
      const { q, r, s, value } = cell;
      const directions = [
        { q: 0, r: -1, s: +1 },
        { q: +1, r: -1, s: 0 },
        { q: +1, r: 0, s: -1 },
        { q: 0, r: +1, s: -1 },
        { q: -1, r: +1, s: 0 },
        { q: -1, r: 0, s: +1 },
      ];
      for (const direction of directions) {
        const neighbor = data.find(
          (el) => el.q === q + direction.q && el.r === r + direction.r && el.s === s + direction.s
        );
        if (neighbor && (neighbor.value === value || neighbor.value === null)) {
          return true;
        }
      }
    }
    setStatus(StatusOfGame.GAME_OVER);
    return false;
  } else {
    return true;
  }
};

export const areArraysEqual = (arr1: AnyObject[], arr2: AnyObject[]) => {
  if (arr1.length !== arr2.length) {
    return false;
  }
  for (let i = 0; i < arr1.length; i++) {
    const obj1 = arr1[i];
    const obj2 = arr2[i];
    for (const key in obj1) {
      if (obj1.hasOwnProperty(key) && obj2.hasOwnProperty(key)) {
        if (obj1[key] !== obj2[key]) {
          return false;
        }
      } else {
        return false;
      }
    }
  }

  return true;
};

const moveToDirection = (direction: Directions, data: Hex[], currentItem: Hex) => {
  let newData = data;
  const nextCellIndex = getNextCellIndex(direction, newData, currentItem, 1);
  const nextCell = newData[nextCellIndex];
  if (nextCell) {
    const isMerged = nextCell.merged || currentItem.merged;
    if (nextCell.value === null && currentItem.value) {
      nextCell.value = currentItem.value;
      currentItem.value = null;
      newData = moveToDirection(direction, newData, nextCell);
    } else if (nextCell.value !== null && currentItem.value && currentItem.value === nextCell.value && !isMerged) {
      nextCell.value += currentItem.value;
      currentItem.value = null;
      nextCell.merged = true;
      return newData;
    }
  }
  return newData;
};

const changeDirection = (direction: Directions, newData: Hex[]) => {
  if (direction === Directions.upLeft || direction === Directions.downLeft || direction === Directions.bottom) {
    for (let i = 0; i <= newData.length - 1; i++) {
      newData = moveToDirection(direction, newData, newData[i]);
    }
  } else {
    for (let i = newData.length - 1; i >= 0; i--) {
      newData = moveToDirection(direction, newData, newData[i]);
    }
  }
};

export const moveNumbers: (data: Hex[], direction: Directions, size: number) => Hex[] = (data, direction, size = 2) => {
  let newData: Hex[] = JSON.parse(JSON.stringify(data));
  for (let count = 0; count <= size; count++) {
    changeDirection(direction, newData);
  }
  newData.forEach((el) => {
    if (el.merged) {
      delete el.merged;
    }
  });
  return newData;
};

export const calculateSizeOfHex = (defaultSize: number, radius: number, dividerParam: number = 4) => {
  const divider = radius / dividerParam;
  return defaultSize / divider;
};

export const calcTop = (radius: string) => {
  let defaultTop = 30;
  return `${defaultTop + +radius}vh`;
};
