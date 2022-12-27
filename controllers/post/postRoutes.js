const { Post, User } = require('../../models');

const router = require('express').Router();

router.get('/:id', async(req, res) => {

    try {
        const thisPost = await Post.findByPk(req.params.id, {
            include: {model: User}
        })

        if(!thisPost){
            res.render('404')
        }


        const thisPostData = thisPost.get({plain: true})
        
        res.render('post', {post: thisPostData})
    } catch (error) {
        console.log(error);
    }
})

module.exports = router;