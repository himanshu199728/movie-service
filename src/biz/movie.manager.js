'use strict';
const BaseManager = require('./base.manager');
const { Movies } = require('../model');
const NoEntityFoundException = require('../exception/no-entity-found.exception');
const MSG = require('../constant/msg.constant');
const RuleViolationException = require('../exception/rule-violation.exception');
const IMDBProxy = require('../proxy/imdb.proxy');

class MovieManager extends BaseManager {

    constructor() {
        super();
        this.imdbProxy = new IMDBProxy();
    }

    async findByTitle(req) {
        try {
            const title = req.params.title;
            if (!title) {
                throw new RuleViolationException(MSG.ARGUMENT_INVALID);
            }

            let movieEntity = await Movies.findOne({ title }).exec();
            if (movieEntity) {
                return movieEntity;
            }
            movieEntity = await this.imdbProxy.findOne({ name: title });
            if (!movieEntity) {
                throw new NoEntityFoundException(MSG.MOVIE_NOT_FOUND);
            }

            movieEntity = ;

        } catch (err) {
            throw err;
        }
    }

    async find(query) {
        try {


        } catch (err) {
            throw err;
        }
    }
}
module.exports = MovieManager;