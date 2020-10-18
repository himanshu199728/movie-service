'use strict';
const BaseManager = require('./base.manager');

class ErrorManager extends BaseManager {

    constructor() {
        super();
    }

    static get(msg) {
        if (!msg) {
            throw new Error('msg argument is require to set error.');
        }

        const result = {
            message: msg.message || msg
        };

        if (typeof msg == 'object' && Object.keys(msg).length > 0 && msg.name == "ValidationError") {
            result.errors = msg.errors;
            return result;
        }
        return result;
    }

}

module.exports = ErrorManager;