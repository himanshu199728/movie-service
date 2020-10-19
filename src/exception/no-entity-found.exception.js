'use strict';
const STATUS = require('../constant/status.constant')

class NoEntityFoundException extends Error {

    constructor(msg) {
        super(msg);
        this.status = STATUS.NOT_FOUND;
    }

    getStatusCode() {
        return this.status;
    }
}

module.exports = NoEntityFoundException;