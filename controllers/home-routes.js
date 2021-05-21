const router = require('express').Router();
const { Post, Comment, User } = require('../models');
const sequelize = require('../config/config');

// get all posts for homepage
router.get('/', (req, res) => {
  Post.findAll({
    attributes: ['id', 'title', 'content', 'created_at'],
    include: [{
      model: Comment,
      attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
      include: {
        model: User,
        attributes: ['username']
      }
    },
    {
      model: User,
      attributes: ['username']
    },
    ]
  })

    .then(postData => {
      const post = postData.map(post => post.get({ plain: true }));
      res.render('homepage', { post, loggedIn: req.session.loggedIn });
    })

    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    })
});


// get single post
router.get('/post/:id', (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id
    },
    attributes: ['id', 'title', 'created_at', 'content'],
    include: [{
      model: Comment,
      attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
      include: {
        model: User,
        attributes: ['username']
      }
    },
    {
      model: User,
      attributes: ['username']
    }]
  })

    .then(postData => {
      if (!postData) {
        res.status(404).json({ message: "No post found with this id" });
        return;
      }
      const post = postData.get({ plain: true });
      console.log(post);
      res.render('single-post', { post, loggedIn: req.session.loggedIn });
    })

    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    })
});

router.get('/post-comments', (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id
    },
    attributes: ['id', 'title', 'created_at', 'content'],
    include: [{
      model: Comment,
      attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
      include: {
        model: User,
        attributes: ['username']
      }
    },
    {
      model: User,
      attributes: ['username']
    }]
  })

    .then(postData => {
      if (!postData) {
        res.status(404).json({ message: "No post found with this id" });
        return;
      }
      const post = postData.get({ plain: true });
      res.render('post-comments', { post, loggedIn: req.session.loggedIn });
    })

    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    })
})

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('signup');
});

module.exports = router;
