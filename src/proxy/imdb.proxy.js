'use strict';
const imdb = require('imdb-api');
const apiKey = process.env.IMDB_KEY;
const cli = new imdb.Client({ apiKey, timeout: 3000 });

class IMDBProxy {

    async findOne(searchQuery) {
        try {
            const result = await cli.get(searchQuery)
            return result;
        } catch (err) {
            throw err;
        }
    }

    async find(searchQuery) {
        try {
            const result = await cli.search(searchQuery)
            return result;
        } catch (err) {
            throw err;
        }
    }

}
module.exports = IMDBProxy;