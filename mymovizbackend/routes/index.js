const express = require('express');
const router = express.Router();


const movieModel = require('../models/movies');

const request = require('request');

// API KEY API THE MOVIEDB => A récuperer directement sur le site 
const apiKey = '';

// PAGE D'ACCEUIL BACKEND
router.get('/', function(req, res, next) {
  res.send('Welcome to our myMoviz backend!');
});

// LIEN AFFICHAGE API SUR APPLICATION
router.get('/movies', function(req, res, next) {
  request(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=fr&page=1&sort_by=popularity.desc&include_adult=true&include_video=false`, function(error, response, body) {
    body = JSON.parse(body);
    res.json({result: true, movies: body.results});
  });
});

// RECHERCHE DES FILMS EN BDD
router.get('/mymovies', function(req, res, next) {
  movieModel.find(function(error, data) {
    res.json({result: true, data});
  });
});

// SAUVEGARDER FILMS EN BDD
router.post('/mymovies', function(req, res, next) {
  var newMovie = new movieModel({
    title: req.body.title,
    overview: req.body.overview,
    poster_path: req.body.poster_path,
    idMovieDB: req.body.idMovieDB
  });
  newMovie.save(function(error, movie) {
    res.json({result: true, movie});
  });
});

// SUPPRESSION D UN FILM
router.delete('/mymovies/:movieId', function(req, res, next) {
  movieModel.deleteOne({idMovieDB: req.params.movieId},
    function(error, response) {
    res.json({result: true});
  });
});

module.exports = router;
