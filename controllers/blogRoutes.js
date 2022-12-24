const router = require('express').Router()
const {User, Post} = require('../models')

// router.get('/', (req, res) => {
//     res.render('homepage', {loggedIn: req.session.loggedIn, username: req.session.username})
// })

router.get('/login', (req, res) => {
    res.render('login', {login: true})
})

router.get('/signup', (req, res) => {
    res.render('login', {login: false})
})

router.get('/', async (req, res) => {
    const postsData = await Post.findAll()
    const posts = postsData.map((post) => post.get({plain: true}))
    res.render('homepage', {loggedIn: req.session.loggedIn, username: req.session.username, posts: posts})
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
         if (!validPassword) {
            res.status(400).json({ message: 'Incorrect email or password. Please try again!' })
            return
        }
        req.session.save(() => {
            req.session.loggedIn = true;
            req.session.username = user.username
            res.status(200).json('Now logged in!')
        })

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

router.post('/logout', (req, res) => {
    if(req.session.loggedIn){
        req.session.destroy(() => {
            res.status(204).end()
        })
    } else {
        res.status(404).end();
    }
})


module.exports = router