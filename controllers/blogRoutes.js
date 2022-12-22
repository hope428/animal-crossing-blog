const router = require('express').Router()
const {User} = require('../models')

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

router.post('/signup', async (req, res) => {
    try {
        const userData = await User.create({
            username: req.body.username,
            password: req.body.pw
        })
        res.status(200).json(userData)
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router