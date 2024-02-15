import { useState, useEffect } from "react";
import "./GameBoard.css";
import HexItem from "../HexItem/HexItem";
import {
  areArraysEqual,
  areMovesAvailable,
  calcTop,
  calculateHexPosition,
  calculateSizeOfHex,
  generateHexCoordinates,
  moveNumbers,
} from "../utils";
import {
  CoordinatesResponse,
  Directions,
  Hex,
  KeyPressed,
  Keys,
  StatusOfGame,
} from "../types/gameTypes";
import {
  RADIUS_DEFAULT,
  SIZE_OF_HEX_DEFAULT,
} from "../../constants/defaultConstants";
import { getRNGPoints } from "../genRandomPoints/genRandomPoints";

const GameBoard = () => {
  const radius = RADIUS_DEFAULT;
  const centerCoordinate = { q: 0, r: 0, s: 0 };
  const size = +radius;
  const hexRadiusPX = calculateSizeOfHex(SIZE_OF_HEX_DEFAULT, +radius);
  const [status, setStatus] = useState<StatusOfGame>(StatusOfGame.PLAYING);
  const genHexagonGreed = generateHexCoordinates(size - 1);
  const [data, setData] = useState<Hex[]>(genHexagonGreed);
  const [keyPressed, setKeyPressed] = useState<KeyPressed>({
    timeStampKeyPress: 0,
    value: "",
  });

  useEffect(() => {
    areMovesAvailable(data, setStatus);
  }, [data, status]);

  const handleKeyPress = (e: KeyboardEvent) => {
    setKeyPressed({ timeStampKeyPress: e.timeStamp, value: e.code });
  };

  useEffect(() => {
    window.addEventListener("keypress", handleKeyPress);
    return () => {
      window.removeEventListener("keypress", handleKeyPress);
    };
  }, []);

  const request = async (
    coordinatesNotEmpty: Hex[] = [],
    changedData: Hex[]
  ) => {
    try {
      const responseData = getRNGPoints(radius, coordinatesNotEmpty);
      const newData = changedData.map((el: any) => {
        const matchingItem = responseData.find((item: CoordinatesResponse) => {
          return item.x === el.q && item.y === el.r && item.z === el.s;
        });
        return matchingItem ? { ...el, value: matchingItem.value } : el;
      });
      setData(newData);
    } catch (error) {
      console.log(error);
    }
  };

  const processingData = (
    dataParams: Hex[],
    direction: Directions,
    size: number
  ) => {
    const newData = moveNumbers(dataParams, direction, size);

    if (!areArraysEqual(dataParams, newData)) {
      const coordinatesNotEmpty = newData
        .map((el) => ({ ...el, x: el.q, y: el.r, z: el.s }))
        .filter((el) => el.value !== null);
      request(coordinatesNotEmpty, newData);
    }
  };

  const emitKeyEvent = () => {
    switch (keyPressed.value) {
      case Keys.E:
        processingData(data, Directions.upRight, size);
        break;
      case Keys.A:
        processingData(data, Directions.downLeft, size);
        break;
      case Keys.W:
        processingData(data, Directions.top, size);
        break;
      case Keys.S:
        processingData(data, Directions.bottom, size);
        break;
      case Keys.Q:
        processingData(data, Directions.upLeft, size);
        break;
      case Keys.D:
        processingData(data, Directions.downRight, size);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    request([], data);
  }, []);

  useEffect(() => {
    emitKeyEvent();
  }, [keyPressed.timeStampKeyPress]);

  const checkStatus = status === StatusOfGame.PLAYING ? "playing" : "game-over";

  return (
    <>
      <div className="field">
        <div className="containerBoard" style={{ top: calcTop(radius) }}>
          {data.map((dataItem, index) => {
            const { q, r, s, value } = dataItem;
            const { x, y } = calculateHexPosition(
              dataItem,
              hexRadiusPX,
              centerCoordinate
            );

            return (
              <HexItem
                key={index}
                className={`hex`}
                style={{
                  left: `${x}px`,
                  top: `${y}px`,
                  width: hexRadiusPX,
                  height: hexRadiusPX * 1.15,
                }}
                dataAtr={{ x: q, y: r, z: s, value: value }}
              />
            );
          })}
        </div>
      </div>
      <div className="processGame">
        <span>
          Game Status: <span data-status={checkStatus}>{status}</span>
        </span>
      </div>
    </>
  );
};

export default GameBoard;
