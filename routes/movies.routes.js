// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Movie = require('../models/Movie.model')
const Celebrity = require('../models/Celebrity.model')


// all your routes here

router.get('/create', (req, res) => {
  Celebrity.find()
    .then((dbCelebrities) => {
      res.render('movies/new-movie', { dbCelebrities });
    })
    .catch((err) =>
      console.error(`Err while displaying movies input page: ${err}`)
    );
});


router.post('/create', (req, res) => {
    const {title, genre, plot, cast} = req.body
    Movie.create({title, genre, plot, cast})
    .then(() => {
        // console.log(movie)
        res.redirect('/movies')
    })
    .catch((err) => {
        console.log('Error while creating a new movie', err)
        res.render('movies/new-movie')
    })
})

router.get('/', (req, res) => {
    Movie.find()
    .then((movies) => {
        // console.log(movies)
        res.render('movies/movies', {movies})
    })
    .catch((err) => console.log('Error while getting the movies from the DB', err))
})

router.get('/:id', (req, res) => {
    const {id} = req.params
    Movie.findById(id)
    .populate("cast")
    .then((movie) => {
        console.log(movie)
        res.render('movies/movie-details', {movie})
    })
    .catch((err) => console.log('Error while getting the movie details from the DB', err))

})

router.post('/:id/delete', (req, res) => {
    const { id } = req.params
    Movie.findByIdAndRemove(id)
      .then(() => res.redirect('/movies'))
      .catch((err) => console.log('Error while deleting the movie', err))
});


router.get('/:id/edit', (req, res) => {
    const { id } = req.params
    Movie.findById(id)
      .then((movie) => {
        res.render('movies/edit-movie', { movie })
      })
      .catch((err) => console.log('Error while getting the movie to edit', err))
  
  });

  
router.post('/:id/edit', (req, res) => {
    const { id } = req.params
    const {title, genre, plot, cast} = req.body
    Movie.findByIdAndUpdate(id, {title, genre, plot, cast}, { new: true })
      .then(() => {
        res.redirect('/movies')
      })
      .catch((err) => console.log('Error while updating the movie', err))
  });

module.exports = router;