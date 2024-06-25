import config from './config';
import { OutOfBoundsError } from './errors';

export interface Logger {
  log(message: string): void;
}

class ConsoleLogger implements Logger {
  log(message: string): void {
    console.log(message);
  }
}

type Position = { x: number; y: number };

export enum Command {
  N = 'N',
  S = 'S',
  E = 'E',
  W = 'W',
}

export class Robot {
  private x: number;
  private y: number;
  readonly gridSize: number = 10;
  public logger: Logger;

  constructor(x: number = 0, y: number = 0, gridSize: number = config.gridSize, logger: Logger = new ConsoleLogger()) {
    if (x < 0 || x >= this.gridSize || y < 0 || y >= this.gridSize) {
      throw new OutOfBoundsError(`Initial position (${x}, ${y}) is out of bounds.`);
    }
    this.setX(x);
    this.setY(y);
    this.gridSize = gridSize;
    this.logger = logger;
  }

  public setX(x: number) {
    this.x = x;
  }

  public setY(y: number) {
    this.y = y;
  }

  public getY() {
    return this.y;
  }
  public getX() {
    return this.x;
  }

  public log(message: string) {
    this.logger.log(`[Robot]: ${message}`);
  }

  getPosition(): Position {
    return { x: this.x, y: this.y };
  }
}
