const router = require('express').Router()
const Wish = require('../../models/wish')
const { getParkByParkCode } = require('../../services/parks')

router.post('/', async (req, res) => {
    console.log("body:", req.body)

    try {
        const park = await getParkByParkCode(req.body.park_code)
        if (!park) {
            res.status(404).send('Park not found')
            return
        }
        const wish = await Wish.create({
            user_id: req.user.id,
            park_id: park.id
        })
        res.status(201).json(wish)
    } catch (err) {
        console.log(err)
        res.status(500).send(err.message)
    }
})

module.exports = router