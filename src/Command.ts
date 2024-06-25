import { Robot } from './robot';
import { InvalidCommandError } from './errors';

interface Command {
  execute(robot: Robot): void;
}

class MoveNorth implements Command {
  execute(robot: Robot): void {
    if (robot.getY() < robot.gridSize - 1) {
      robot.setY(robot.getY() + 1);
    } else {
      robot.log('Command N would move out of bounds.');
    }
  }
}

class MoveSouth implements Command {
  execute(robot: Robot): void {
    if (robot.getY() > 0) {
      robot.setY(robot.getY() - 1);
    } else {
      robot.log('Command S would move out of bounds.');
    }
  }
}

class MoveEast implements Command {
  execute(robot: Robot): void {
    if (robot.getX() < robot.gridSize - 1) {
      robot.setX(robot.getX() + 1);
    } else {
      robot.log('Command E would move out of bounds.');
    }
  }
}

class MoveWest implements Command {
  execute(robot: Robot): void {
    if (robot.getX() > 0) {
      robot.setX(robot.getX() - 1);
    } else {
      robot.log('Command W would move out of bounds.');
    }
  }
}

class CommandFactory {
  private static commandMap: { [key: string]: Command } = {
    N: new MoveNorth(),
    S: new MoveSouth(),
    E: new MoveEast(),
    W: new MoveWest(),
  };

  static getCommand(token: string): Command {
    const command = this.commandMap[token];
    if (!command) {
      throw new InvalidCommandError(`Unknown command: ${token}`);
    }
    return command;
  }
}

export class CommandParser {
  static parse(commandSequence: string): Command[] {
    const commands: Command[] = [];
    const movements = commandSequence.split(' ');

    for (const movement of movements) {
      try {
        const command = CommandFactory.getCommand(movement);
        commands.push(command);
      } catch (error) {
        if (error instanceof InvalidCommandError) {
          console.log(`[CommandParser]: ${error.message}`);
        } else {
          throw error;
        }
      }
    }

    return commands;
  }
}
