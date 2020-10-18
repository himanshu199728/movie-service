'use strict';

const du = {
    currentEpochTime: () => {
        const d = Date.now();
        return Math.round(d / 1000);
    }
}

module.exports = du;