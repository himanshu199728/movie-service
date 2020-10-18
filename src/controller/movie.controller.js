'use strict';
const MovieManager = require('../biz/movie.manager');
const BaseController = require('./base.controller');

class MovieController extends BaseController {

    async findByTitle(req, res) {
        try {
            const movieManager = new MovieManager();
            const result = await movieManager.findById(req);
            super.ok(res, result);
        } catch (err) {
            super.error(res, err);
        }
    }

    async find(req, res) {
        try {
            const movieManager = new MovieManager();
            const queryParams = req.query;
            const result = await movieManager.find(req);
            super.ok(res, result);
        } catch (err) {
            super.error(res, err);
        }
    }

}

module.exports = MovieController;