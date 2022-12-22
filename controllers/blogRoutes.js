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

router.post('/login', async (req, res) => {
    console.log(req.body);

    try {
        const user = await User.findOne({
            where: {
                username: req.body.username
            }
        })

        if(!user){
            res.status(400).json({ message: 'Incorrect email or password. Please try again!' })
            return
        }

        const validPassword = await user.validatePassword(req.body.pw)
        if(validPassword) {
            console.log("You are successfully logged in!");
            res.json("You are successfully logged in!");
        } else if (!validPassword) {
            res.status(400).json({ message: 'Incorrect email or password. Please try again!' })
            return
        }
    } catch (error) {
        
    }
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