const { Post, User } = require("../../models");

const router = require("express").Router();

router.get("/:id", async (req, res) => {
  try {
    const thisPost = await Post.findByPk(req.params.id, {
      include: { model: User },
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

module.exports = router;
