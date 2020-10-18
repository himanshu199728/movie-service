'use strict';
const STATUS = require('../constant/status.constant')

class NoEntityFoundException extends Error {

    constructor(msg) {
        super(msg);
        this.status = STATUS.NO_DATA_FOUND;
    }

    getStatusCode() {
        return this.status;
    }
}

module.exports = NoEntityFoundException;