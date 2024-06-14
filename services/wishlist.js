const { Wish } = require("../models")

async function getWishlistByUserId(userId) {
    const res = await Wish.findAll({
        where: {
            user_id: userId
        }
    })
}

module.exports = {
    getWishlistByUserId
}