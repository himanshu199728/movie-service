const { Schema, model } = require('mongoose');
const du = require('../utils/date.utils');
const MovieSchema = new Schema({
    id: { type: String, required: true, unique: true },
    release_year: {
        type: Number,
        validate: { validator: Number.isInteger },
        default: du.currentEpochTime()
    },
    rating: { type: Number, default: 0.0 },
    genres: { type: [String], default: [] }
});

const Movies = model('Movies', MovieSchema)
module.exports = Movies;