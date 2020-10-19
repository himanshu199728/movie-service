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
const { EQ, GT, GTE, LT, LTE } = require('../constant/mdb-operator.constant');

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
                const movieEntity = Movies.find({});
                movieEntity = buildQuery(movieEntity, query);
                const result = await movieEntity.exec();
                return result;
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
                // Validate if argument ,entity exist or not
                if (!params) {
                    throw new RuleViolationException(MSG.ARGUMENT_INVALID);
                }
                const movieEntity = await Movies.findOne({ id }).exec();
                if (movieEntity) {
                    throw new RuleViolationException(MSG.MOVIE_NOT_FOUND);
                }
                // Update movie by id
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

// make query for query entity
function buildQuery(movieEntity, query) {
    // Code for query part
    if (query.id) {
        movieEntity = movieEntity.where('id').equals(query.id);
    }
    if (query.year) {
        if (query.year[0] > query.year[1]) {
            query.year = query.year.reverse();
        }
        movieEntity = movieEntity.where('release_year').gte(query[0]).lte(query[1]);
    }
    if (query.rating) {
        if (query.rating.method == GT) {
            movieEntity = movieEntity.where('rating').gt(query.rating.value);
        } else if (query.rating.method == LT) {
            movieEntity = movieEntity.where('rating').lt(query.rating.value);
        } else if (query.rating.method == LTE) {
            movieEntity = movieEntity.where('rating').lte(query.rating.value);
        } else if (query.rating.method == GTE) {
            movieEntity = movieEntity.where('rating').gte(query.rating.value);
        } else if (query.rating.method == EQ) {
            movieEntity = movieEntity.where('rating').equals(query.rating.value);
        }
    }
    if (query.genres) {
        movieEntity = movieEntity.where('genres').in(query.genres);
    }
    return movieEntity;
}