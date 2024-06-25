export class OutOfBoundsError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'OutOfBoundsError';
  }
}

export class InvalidCommandError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidCommandError';
  }
}
