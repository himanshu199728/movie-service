'use strict';

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
    res.status()
};
