const { Schema, model } = require('mongoose');
const MovieSchema = new Schema({
    id: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true, unique: true, index: true },
    release_year: {
        type: String,
        maxlength: 4,
        minlength: 4,
        default: null
    },
    rating: { type: Number, default: 0.0 },
    genres: { type: [String], default: [] }
});

const Movies = model('Movies', MovieSchema)
module.exports = Movies;