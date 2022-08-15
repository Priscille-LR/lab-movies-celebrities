// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const express = require("express")
const router = express.Router();
const Celebrity = require('../models/Celebrity.model')

// all your routes here
router.get('/create', (req, res) => {
    res.render('celebrities/new-celebrity')
})

router.post('/create', (req, res) => {
    const {name, occupation, catchPhrase} = req.body
    Celebrity.create({name, occupation, catchPhrase})
    .then(() => res.redirect('/celebrities'))
    .catch((err) => {
        console.log('Error while creating a new celeb', err)
        res.render('celebrities/new-celebrity')
    })
})

router.get('/', (req, res) => {
    Celebrity.find()
    .then((celebrities) => {
        // console.log(celebrities)
        res.render('celebrities/celebrities', {celebrities})
    })
    .catch((err) => console.log('Error while getting the celebrities from the DB', err))

})

module.exports = router;