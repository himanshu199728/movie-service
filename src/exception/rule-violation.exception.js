'use strict';
const STATUS = require('../constant/status.constant');

class RuleViolationException extends Error {

    constructor(msg) {
        super(msg);
        this.status = STATUS.CLIENT_ERROR;
    }
}
module.exports = RuleViolationException;