const router = require('express').Router()
const Wish = require('../../models/wish')

router.post('/', async (req, res) => {
    console.log("body:", req.body)

    try {
        Wish.create({
            id: null,
            user_id: req.session.user_id,
            park_id: req.body.park_id
        })
    } catch (err) {
        res.status(500).send(err.message)
    }

    res.status(200).send()
})

module.exports = router