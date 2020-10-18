'use strict';
const HEADER = require('../constant/header.constant');
const STATUS = require('../constant/status.constant');

class BaseController {

    ok(res, result) {
        res.status(STATUS.OK)
            .header(HEADER.CONTENT_TYPE, HEADER.JSON)
            .send(JSON.stringify(result));
    }

    error(res, err) {
        res.status(err)
            .header(HEADER.CONTENT_TYPE)
            .send(ErrorManger.get(error));
    }
}

module.exports = BaseController;