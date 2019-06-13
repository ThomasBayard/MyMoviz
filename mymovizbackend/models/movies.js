const mongoose = require('mongoose');

const movieSchema = mongoose.Schema({
    title: String,
    overview: String,
    poster_path: String,
    idMovieDB: Number
  });

const movieModel = mongoose.model('movies', movieSchema);

module.exports = movieModel;
