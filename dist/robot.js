"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Robot = exports.Command = void 0;
const config_1 = require("./config");
const errors_1 = require("./errors");
class ConsoleLogger {
    log(message) {
        console.log(message);
    }
}
var Command;
(function (Command) {
    Command["N"] = "N";
    Command["S"] = "S";
    Command["E"] = "E";
    Command["W"] = "W";
})(Command || (exports.Command = Command = {}));
class Robot {
    constructor(x = 0, y = 0, gridSize = config_1.default.gridSize, logger = new ConsoleLogger()) {
        this.gridSize = 10;
        if (x < 0 || x >= this.gridSize || y < 0 || y >= this.gridSize) {
            throw new errors_1.OutOfBoundsError(`Initial position (${x}, ${y}) is out of bounds.`);
        }
        this.setX(x);
        this.setY(y);
        this.gridSize = gridSize;
        this.logger = logger;
    }
    setX(x) {
        this.x = x;
    }
    setY(y) {
        this.y = y;
    }
    getY() {
        return this.y;
    }
    getX() {
        return this.x;
    }
    log(message) {
        this.logger.log(`[Robot]: ${message}`);
    }
    getPosition() {
        return { x: this.x, y: this.y };
    }
}
exports.Robot = Robot;
