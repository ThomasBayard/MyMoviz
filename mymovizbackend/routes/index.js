var express = require('express');
var router = express.Router();
let request = require("async-request");
var mongoose = require('mongoose')
var movieModel = require('../models/movies')

// API KEY DE THEMOVIE DB
var myApiKey = ""
    //  --------------------------------------------

/* Route home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

// Route movies
router.get('/movies', async function(req, res, next) {

    // Async function pour récuperer les films via l'API => Async pour récuperer l'ensemble de la data avant de faire les requêtes
    var data = await request(`https://api.themoviedb.org/3/discover/movie?api_key=${myApiKey}&language=fr&sort_by=popularity.desc&include_adult=false&include_video=false&page=1
  `)

    // On parse les datas en format JSON pour etre lu dans le composant 
    body = JSON.parse(data.body);

    // console.log('DATA complete -->', body)

    res.json({ result: true, movies: body.results });
})

// Route get mymovies
router.get('/mymovies', function(req, res, next) {

    // Recherche de l'ensemble des films en base de données 
    movieModel.find(
        function(error, data) {
            if (error) {
                console.log("Tu rencontres un problème ! ->", error)
            } else {
                console.log("Voici le data disponible en BDD ! =>", data);

                res.json({ result: true, data });
            }
        }
    )

})

// Post route
router.post('/mymovies', function(req, res, next) {

    // 1) Création d'un film en base de données => en cliquant sur le boutin like/love
    var newMovie = new movieModel({
        poster_path: req.body.poster_path,
        overview: req.body.overview,
        title: req.body.title,
        idMovieDB: req.body.idMovieDB,
    });
    //  2) Sauvegarde en BDD
    newMovie.save(
        function(error, movie) {
            if (error) {

                console.log("Tu rencontres un problème ! =>", error)

            } else {

                console.log("Voici le film qui est enregistré ! =>", movie)

                res.json({ result: true, movie });
            }
        }
    );

})

// Route Delete 
router.delete('/mymovies/:movieId', function(req, res, next) {

    console.log('je suis dans ma route delete')

    // Suppression du film en BDD via la propriété idMovieDB
    movieModel.deleteOne({ idMovieDB: req.params.movieId },
        function(error, movie) {

            if (error) {
                console.log("Tu rencontres un problème ! =>", error)
            } else {

                console.log("Voici le film qui a été supprimé !", movie)

                res.json({ result: true, movie });
            }
        })
})

module.exports = router;
