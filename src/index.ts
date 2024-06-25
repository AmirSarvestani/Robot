import { CommandParser } from './Command';
import { Robot } from './robot';

const robot = new Robot(0, 0);
const commandSequence = 'N E N E N E N E';
const commands = CommandParser.parse(commandSequence);

for (const command of commands) {
  command.execute(robot);
}

console.log(robot.getPosition());

const robot1 = new Robot(0, 0);
const emptyCommand = '';

const robot1commands = CommandParser.parse(emptyCommand);

for (const command of robot1commands) {
  command.execute(robot1);
}

console.log(robot1.getPosition());

const robot2 = new Robot(0, 8);
const northCommand = 'N';
const robot2commands = CommandParser.parse(northCommand);
for (const command of robot2commands) {
  command.execute(robot2);
}

console.log(robot2.getPosition());

const robot3 = new Robot(0, 0);
const westCommand = 'W';
const robot3commands = CommandParser.parse(westCommand);
console.log(robot3.getPosition());

const robot4 = new Robot(-1, 0);
console.log(robot4.getPosition());
