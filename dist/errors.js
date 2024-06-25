"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidCommandError = exports.OutOfBoundsError = void 0;
class OutOfBoundsError extends Error {
    constructor(message) {
        super(message);
        this.name = 'OutOfBoundsError';
    }
}
exports.OutOfBoundsError = OutOfBoundsError;
class InvalidCommandError extends Error {
    constructor(message) {
        super(message);
        this.name = 'InvalidCommandError';
    }
}
exports.InvalidCommandError = InvalidCommandError;
