const router = require('express').Router();
const { comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
    const newData = {
        body: req.body.body,
        post_id: req.body.post_id,
    };

    try {
        const newComment = await comment.create(newData);

        req.statusCode(200).json(newComment);
    }   catch(err) {
        res.status(400).json(err);
    }
});

module.exports = router;