const router = require('express').Router();
const { Post, User, Comment } = require('../models/');
const withAuth = require('../utils/auth');

router.get('/', withAuth, (req, res) => {
  Post.findAll({

    where: {
      user_id: req.session.userId,
    },

    attributes: [
      'id',
      'title',
      'created_at',
      'content',
    ],
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
      const posts = postData.map(post => post.get({ plain: true }));
      res.render('all-posts-admin', { layout: 'dashboard', posts });
    })

    .catch(err => {
      console.log(err);
      res.redirect('login');
    });
},

  router.get('/new', withAuth, (req, res) => {
    res.render('newPost');
  }),

  router.get('/edit/:id', withAuth, (req, res) => {
    Post.findOne({
      where: {
        id: req.params.id
      },
      attributes: [
        'id', 'title', 'content', 'created_at'],
      include: [{
        model: User,
        attributes: ['username']
      },
      {
        model: Comment,
        attributes: ['id', 'post_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username']
        }
      }]
    })

      .then(postData => {
        if (!postData) {
          res.status(404).json({ message: "No posts found with this id" });
          return;
        }
        const post = postData.get({ plain: true });
        res.render('edit-post', { post, loggedIn: true });
      })

      .catch(err => {
        console.log(err);
        res.redirect('login');
      })
  }));

module.exports = router;
