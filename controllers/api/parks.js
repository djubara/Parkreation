const { Comment } = require('../../models');
const { getParkByParkCode } = require('../../services/parks');

const router = require('express').Router();

router.post('/:parkCode/comments', async (req, res) => {
    try {
        if (!req.user) {
            res.status(401).json({ message: 'You must be signed in to comment' });
            return;
        }
        const { parkCode } = req.params;
        const { content } = req.body;
        const park = await getParkByParkCode(parkCode);
        if (!park) {
            res.status(404).json({ message: 'No park found with this park code' });
            return;
        }
        const comment = await Comment.create({
            content,
            user_id: req.user.id,
            park_id: park.id
        });
        res.status(201).json(comment);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})
module.exports = router;