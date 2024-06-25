"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandParser = void 0;
const errors_1 = require("./errors");
class MoveNorth {
    execute(robot) {
        if (robot.getY() < robot.gridSize - 1) {
            robot.setY(robot.getY() + 1);
        }
        else {
            robot.log('Command N would move out of bounds.');
        }
    }
}
class MoveSouth {
    execute(robot) {
        if (robot.getY() > 0) {
            robot.setY(robot.getY() - 1);
        }
        else {
            robot.log('Command S would move out of bounds.');
        }
    }
}
class MoveEast {
    execute(robot) {
        if (robot.getX() < robot.gridSize - 1) {
            robot.setX(robot.getX() + 1);
        }
        else {
            robot.log('Command E would move out of bounds.');
        }
    }
}
class MoveWest {
    execute(robot) {
        if (robot.getX() > 0) {
            robot.setX(robot.getX() - 1);
        }
        else {
            robot.log('Command W would move out of bounds.');
        }
    }
}
class CommandFactory {
    static getCommand(token) {
        const command = this.commandMap[token];
        if (!command) {
            throw new errors_1.InvalidCommandError(`Unknown command: ${token}`);
        }
        return command;
    }
}
CommandFactory.commandMap = {
    N: new MoveNorth(),
    S: new MoveSouth(),
    E: new MoveEast(),
    W: new MoveWest(),
};
class CommandParser {
    static parse(commandSequence) {
        const commands = [];
        const movements = commandSequence.split(' ');
        for (const movement of movements) {
            try {
                const command = CommandFactory.getCommand(movement);
                commands.push(command);
            }
            catch (error) {
                if (error instanceof errors_1.InvalidCommandError) {
                    console.log(`[CommandParser]: ${error.message}`);
                }
                else {
                    throw error;
                }
            }
        }
        return commands;
    }
}
exports.CommandParser = CommandParser;
