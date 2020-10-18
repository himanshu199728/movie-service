'use strict'

class ValidationException extends Error {

    constructor(message, errors) {
        super(message);
        this.name = this.constructor.name;
        this.errors = errors;
        this.status = 400;
    }

    statusCode() {
        return this.status;
    }
}

module.exports = ValidationException;