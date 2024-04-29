const router = require('express').Router();
const { post, user, comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
      const postData = await post.findAll({
        include: [{ model: comment}, { model: user }],
      });

      const posts = postData.map((project) => project.get({ plain: true }));

      res.render('homepage', {
        posts,
        logged_in: req.session.logged_in
      });
    } catch (err) {
      console.log('Error', err)
      res.status(500).json(err);
    }
});

router.get('/post/:id', async (req, res) => {
    try {
      const postData = await post.findByPk(req.params.id, {
        include: [{ model: comment}, { model: user }],
      });

      const post = postData.get({ plain: true });

      res.render('post', {
        ...post,
        logged_in: req.session.logged_in
      });
    } catch (err) {
      res.status(500).json(err);
    }
});

router.get('/profile', withAuth, async (req, res) => {
    console.log('profile:', req.session.user_id);
    try {
      const userData = await user.findByPk(req.session.user_id, {
        attributes: { exclude: ['password'] },
        include: [{ model: post }],
      });

      const user = userData.get({ plain: true });

      res.render('profile', {
        ...user,
        logged_in: true
      });
    } catch (err) {
      res.status(500).json(err);
    }
});

router.get('/login', async (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/profile');
        return;
    }

    res.render('login');
});

module.exports = router;