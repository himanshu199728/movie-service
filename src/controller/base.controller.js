'use strict';
const HEADER = require('../constant/header.constant');
const STATUS = require('../constant/status.constant');
const ErrorManager = require('../biz/error.manager');

class BaseController {

    ok(res, result) {
        res.status(STATUS.OK)
            .header(HEADER.CONTENT_TYPE, HEADER.JSON)
            .send(JSON.stringify(result));
    }

    error(res, err) {
        res.status(err.status || STATUS.SERVER_ERROR)
            .header(HEADER.CONTENT_TYPE, HEADER.JSON)
            .send(JSON.stringify(ErrorManager.get(err)));
    }
}

module.exports = BaseController;