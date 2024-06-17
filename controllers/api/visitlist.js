const router = require('express').Router()
const Visit = require('../../models/visit')
const { getParkByParkCode } = require('../../services/parks')

router.post('/', async (req, res) => {
    try {
        const park = await getParkByParkCode(req.body.park_code)
        if (!park) {
            res.status(404).send('Park not found')
            return
        }
        const visit = await Visit.create({
            user_id: req.user.id,
            park_id: park.id
        })
        res.status(201).json(visit)
    } catch (err) {
        console.log(err)
        res.status(500).send(err.message)
    }
})

module.exports = router