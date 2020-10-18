'use strict';
const STATUS = require('../constant/status.constant');
const MovieController = require('./movie.controller');

function proxy(obj) {
    let handler = {
        get(target, propKey, receiver) {
            const originMethod = target[propKey];
            return function (...args) {
                return originMethod.apply(obj, args);
            }
        }
    };
    return new Proxy(obj, handler);
}


module.exports.defaultHandler = (req, res) => {
    res.status(STATUS.OK).send('Service under Construction ...');
};

module.exports.movieController = proxy(new MovieController());


