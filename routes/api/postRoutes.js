const router = require('express').Router();
const { post, comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', withAuth, async (req, res) => {
    try {
      const postData = await post.findAll({
        include: [{ model: comment}],
      });
      res.status(200).json(postData);
    } catch (err) {
      res.status(400).json(err);
    }
});

router.get('/', withAuth, async (req, res) => {
    try {
      const postData = await post.findByPk(req.params.id, {
        include: [{ model: comment}],
      });

      if (!readerData) {
        res.status(404).json({ message: 'No post found with that id' });
        return;
      }

      res.status(200).json(postData);
    } catch (err) {
      res.status(400).json(err);
    }
});

router.put('/', withAuth, async (req, res) => {
  try {
    const newData = {
        title: req.body.title,
        body: req.body.body
    };

    console.log(newData);

    const postData = await post.update(newData,
      {
        where: {
            book_id: req.params.book_id,
        },
      });
    res.status(200).json(postData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/', withAuth, async (req, res) => {
  const newData = {
    title: req.body.title,
    body: req.body.body,
    user_id: req.body.user_id,
  };
  try {
    const newPost = await post.create(newData);

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const postData = await post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;