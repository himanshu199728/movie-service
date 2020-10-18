'use strict';
const BaseManager = require('./base.manager');
const { Movies } = require('../model');
const NoEntityFoundException = require('../exception/no-entity-found.exception');
const MSG = require('../constant/msg.constant');
const RuleViolationException = require('../exception/rule-violation.exception');
const IMDBProxy = require('../proxy/imdb.proxy');
const SCHEMA = require('../constant/schema.constant');
const { v1 } = require('uuid');
const ValidationException = require('../exception/validation.exception');
const ErrorManager = require('./error.manager');

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

            movieEntity = buildMovie(movieEntity);
            await Movies.create(movieEntity);
            return movieEntity;
        } catch (err) {
            throw err;
        }
    }

    async find(query) {
        try {
            const validationResult = this.validate(SCHEMA.MOVIE_SEARCH, query);
            if (validationResult.valid) {

            }
            throw new ValidationException(MSG.VALIDATION_ERROR, validationResult.errors);
        } catch (err) {
            throw err;
        }
    }

    async updateOne(req) {
        try {
            const validationResult = this.validate(SCHEMA.MOVIE_UPDATE, req.body);
            if (validationResult.valid) {
                const params = req.body;
                const id = req.params.id;
                if (!params) {
                    throw new RuleViolationException(MSG.ARGUMENT_INVALID);
                }
                await Movies.findOneAndUpdate({ id }, params).exec();
                return { message: MSG.MOVIE_UPDATE_SUCCESS };
            }
            throw new ValidationException(MSG.VALIDATION_ERROR, validationResult.errors);
        } catch (err) {
            throw err;
        }
    }
}
module.exports = MovieManager;

function buildMovie(movie) {
    const movieEntity = {
        release_year: movie,
        rating: [],
        genres: []
    }
    if (!movie.id) {
        movieEntity.id = v1();
    }
    return movieEntity;
}