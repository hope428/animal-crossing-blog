const router = require('express').Router();
const blogRoutes = require('./blogRoutes')
const postRoutes = require('./post')

router.use('/', blogRoutes);
router.use('/post', postRoutes)

module.exports = router