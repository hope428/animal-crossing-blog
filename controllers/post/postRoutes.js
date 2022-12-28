const { Post, User, Comment } = require("../../models");

const router = require("express").Router();

router.get("/:id", async (req, res) => {
  try {
    const thisPost = await Post.findByPk(req.params.id, {
      //include model: user,
      //include model comments, including user
      include: [
        {
          model: Comment,
        },
        { model: User },
      ],
    });

    if (!thisPost) {
      res.render("404");
    }

    const thisPostData = thisPost.get({ plain: true });
    res.render("post", { post: thisPostData });
  } catch (error) {
    console.log(error);
  }
});

router.get("/edit/:id", async (req, res) => {
  const currentPost = await Post.findByPk(req.params.id, {
    include: { model: User },
  });
  const currentPostData = currentPost.get({ plain: true });
  res.render("updatepost", {
    post: currentPostData,
    loggedIn: req.session.loggedIn,
    userId: req.session.userId,
  });
});

router.put("/edit/:id", async (req, res) => {
  const currentPost = await Post.update(
    {
      title: req.body.title,
      content: req.body.content,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  );
  res.json(currentPost);
});

router.post("/:id", async (req, res) => {
  const newComment = await Comment.create({
    comment: req.body.comment,
    user_id: req.body.user_id,
    post_id: req.params.id,
  });
  res.json(newComment);
});

module.exports = router;
