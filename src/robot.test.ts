import { Robot } from './robot';
import { CommandParser } from './Command';
import { OutOfBoundsError } from './errors';
import { Logger } from './robot';

class TestLogger implements Logger {
  public messages: string[] = [];

  log(message: string): void {
    this.messages.push(message);
  }
}

describe('Robot', () => {
  let robot: Robot;
  let logger: TestLogger;

  beforeEach(() => {
    logger = new TestLogger();
    robot = new Robot(0, 0, 10, logger);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should start at the initial position (0, 0)', () => {
    expect(robot.getPosition()).toEqual({ x: 0, y: 0 });
  });

  it('should throw an error and set at the initial position (0, 0) if initialized out of bounds', () => {
    expect(robot.getPosition()).toEqual({ x: 0, y: 0 });
  });

  it('should throw an error and set at the initial position (0, 0) if initialized with negative', () => {
    expect(() => new Robot(-2, 0)).toThrow(new OutOfBoundsError('Initial position (-2, 0) is out of bounds.'));
  });

  it('should throw an error and set at the initial position (0, 0) if initialized with negative', () => {
    expect(() => new Robot(5, -4)).toThrow(new OutOfBoundsError('Initial position (5, -4) is out of bounds.'));
  });

  it('should throw an error and set at the initial position (0, 0) if initialized with negative', () => {
    expect(() => new Robot(-5, -4)).toThrow(new OutOfBoundsError('Initial position (-5, -4) is out of bounds.'));
  });

  it('should move north correctly', () => {
    robot = new Robot(0, 0, 10);
    const commands = CommandParser.parse('N');
    commands.forEach((command) => command.execute(robot));
    expect(robot.getPosition()).toEqual({ x: 0, y: 1 });
  });

  it('should move east correctly', () => {
    const commands = CommandParser.parse('E');
    commands.forEach((command) => command.execute(robot));
    expect(robot.getPosition()).toEqual({ x: 1, y: 0 });
  });

  it('should move south correctly', () => {
    const commands = CommandParser.parse('S');
    commands.forEach((command) => command.execute(robot));
    expect(robot.getPosition()).toEqual({ x: 0, y: 0 });
    const commands1 = CommandParser.parse('N N S');
    commands1.forEach((command) => command.execute(robot));
    expect(robot.getPosition()).toEqual({ x: 0, y: 1 });
  });

  it('should move west correctly', () => {
    const commands = CommandParser.parse('W');
    commands.forEach((command) => command.execute(robot));
    expect(robot.getPosition()).toEqual({ x: 0, y: 0 });
    const commands1 = CommandParser.parse('E E W');
    commands1.forEach((command) => command.execute(robot));
    expect(robot.getPosition()).toEqual({ x: 1, y: 0 });
  });

  it('should get back to its original position', () => {
    const commands = CommandParser.parse('N E S W');
    commands.forEach((command) => command.execute(robot));
    expect(robot.getPosition()).toEqual({ x: 0, y: 0 });
  });

  it('should not move outside the south boundary', () => {
    const commands = CommandParser.parse('S');
    commands.forEach((command) => command.execute(robot));
    expect(robot.getPosition()).toEqual({ x: 0, y: 0 });
    expect(logger.messages).toContain('[Robot]: Command S would move out of bounds.');
  });

  it('should not move outside the east boundary', () => {
    const commands = CommandParser.parse('E E E E E E E E E E');
    commands.forEach((command) => command.execute(robot));
    expect(robot.getPosition()).toEqual({ x: 9, y: 0 });
  });

  it('should not move outside the west boundary', () => {
    const commands = CommandParser.parse('W');
    commands.forEach((command) => command.execute(robot));
    expect(robot.getPosition()).toEqual({ x: 0, y: 0 });
    expect(logger.messages).toContain('[Robot]: Command W would move out of bounds.');
  });

  it('should handle unknown commands correctly', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    CommandParser.parse('X');
    expect(consoleSpy).toHaveBeenCalledWith('[CommandParser]: Unknown command: X');
  });
});
