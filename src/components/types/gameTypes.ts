export enum StatusOfGame {
  PLAYING = 'Playing',
  GAME_OVER = 'GAME OVER',
}

export interface Hex {
  q: number;
  r: number;
  s: number;
  value: number | null;
  merged?: boolean;
  [key: string]: unknown;
}
export interface CoordinatesResponse {
  x: number;
  y: number;
  z: number;
}

export interface KeyPressed {
  timeStampKeyPress: number;
  value: string;
}

export interface TransformToHexCoordinates {
  x: number;
  y: number;
  z: number;
  value: number | null;
}

export enum Directions {
  downRight = 'downRight',
  downLeft = 'downLeft',
  bottom = 'bottom',
  upRight = 'upRight',
  upLeft = 'upLeft',
  top = 'top',
}

export enum Keys {
  Q = 'KeyQ',
  W = 'KeyW',
  E = 'KeyE',
  A = 'KeyA',
  S = 'KeyS',
  D = 'KeyD',
}

export interface CenterCoordinates {
  q: number;
  r: number;
  s: number;
}

export interface AnyObject {
  [key: string]: unknown;
}

export enum ColorsHexes {
  twoColor = '#ece4db',
  fourColor = '#ebe0ca',
  eightColor = '#e9b381',
  sixteenColor = '#e8996c',
  thirtyTwoColor = '#e78267',
  sixtyFourColor = '#e56747',
  oneHundredAndTwentyEightColor = '#e64d26',
  twoHundredFiftySixColor = '#e04219',
  fiveHundredTwelveColor = '#b13211',
  oneThousandTwentyFourColor = '#8f1e02',
  twoThousandFortyEightColor = '#820d04',
}

export interface QueryParams {
  port: string;
  hostName: string;
  radius: string;
}
