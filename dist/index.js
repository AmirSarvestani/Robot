"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = require("./Command");
const robot_1 = require("./robot");
const robot = new robot_1.Robot(0, 0);
const commandSequence = 'N E N E N E N E';
const commands = Command_1.CommandParser.parse(commandSequence);
for (const command of commands) {
    command.execute(robot);
}
console.log(robot.getPosition());
const robot1 = new robot_1.Robot(0, 0);
const emptyCommand = '';
const robot1commands = Command_1.CommandParser.parse(emptyCommand);
for (const command of robot1commands) {
    command.execute(robot1);
}
console.log(robot1.getPosition());
const robot2 = new robot_1.Robot(0, 8);
const northCommand = 'N';
const robot2commands = Command_1.CommandParser.parse(northCommand);
for (const command of robot2commands) {
    command.execute(robot2);
}
console.log(robot2.getPosition());
const robot3 = new robot_1.Robot(0, 0);
const westCommand = 'W';
const robot3commands = Command_1.CommandParser.parse(westCommand);
console.log(robot3.getPosition());
const robot4 = new robot_1.Robot(-1, 0);
console.log(robot4.getPosition());
