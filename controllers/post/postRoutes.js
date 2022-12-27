const router = require('express').Router();

router.get('/:id', async(req, res) => {
    res.send("you're at post " + req.params.id)
})

module.exports = router;