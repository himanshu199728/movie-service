const assert = require('assert');
const imdb = require('imdb-api');

describe('should query movie data from imdb', () => {

    beforeEach(() => {
        require('dotenv').config();
    })

    it('should fetch data by name', async () => {
        try {
            const API_KEY = process.env.IMDB_KEY;
            const result = await imdb.get({ name: 'The Toxic Avenger' }, { apiKey: API_KEY });
            console.log(JSON.parse(JSON.stringify(result)));
            assert.equal(result != null, true, 'Movie data not found');
        } catch (err) {
            console.error(err);
        }
    })
})