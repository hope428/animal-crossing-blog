const router = require('express').Router()

router.get('/', (req, res) => {
    res.render('homepage')
})


router.get('/login', (req, res) => {
    res.render('login', {login: true})
})

router.get('/signup', (req, res) => {
    res.render('login', {login: false})
})

router.post('/login', (req, res) => {
    console.log(req.body);
    res.json('You are now logged in!')
})

module.exports = router