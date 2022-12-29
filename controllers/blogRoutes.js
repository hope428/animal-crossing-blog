const router = require("express").Router();
const { User, Post } = require("../models");
const withAuth = require('../utils/auth');

router.get("/", async (req, res) => {
  const postsData = await Post.findAll({ include: { model: User } });
  const posts = postsData.map((post) => post.get({ plain: true }));
  res.render("homepage", {
    loggedIn: req.session.loggedIn,
    username: req.session.username,
    posts: posts,
  });
});

router.get("/login", (req, res) => {
  res.render("login", { login: true });
});

router.get("/signup", (req, res) => {
  res.render("login", { login: false });
});

router.get("/dashboard", withAuth, async (req, res) => {
    const userPosts = await Post.findAll({
      where: {
        user_id: req.session.userId,
      },
      include: [{ model: User, attributes: ["username", "id"] }],
    });
    if (userPosts) {
      const userPostsData = userPosts.map((post) => post.get({ plain: true }));

      res.render("dashboard", {
        userPostsData,
        loggedIn: req.session.loggedIn,
        username: req.session.username,
      });
      return;
  }

  res.render("dashboard", { loggedIn: req.session.loggedIn });
});

router.get("/new-post", withAuth, (req, res) => {
  res.render("newpost", {
    loggedIn: req.session.loggedIn,
    userId: req.session.userId,
  });
});

router.post("/new-post", async (req, res) => {
  try {
    if (!req.body.title || !req.body.content || !req.body.user_id) {
      res.json("Need to have a title, content, and user to post!");
    } else {
      const newPost = await Post.create({
        title: req.body.title,
        content: req.body.content,
        user_id: req.body.user_id,
      });
      res.status(201).json(newPost);
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        username: req.body.username,
      },
    });
    if (!user) {
      res
        .status(400)
        .json({ message: "Incorrect email or password. Please try again!" });
      return;
    }
    const validPassword = await user.validatePassword(req.body.pw);
    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect email or password. Please try again!" });
      return;
    }
    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.userId = user.id;
      req.session.username = user.username;
      res.status(200).json("Now logged in!");
    });
  } catch (error) {
    console.log(error);
  }
});

router.post("/signup", async (req, res) => {
  try {
    const userData = await User.create({
      username: req.body.username,
      password: req.body.pw,
    });
    res.status(200).json(userData);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
