const { Park, Comment } = require("../models");
const { getParksByParkCode } = require("./nps");

module.exports = {
    async getParkByParkCode(parkCode) {
        const park = await Park.findOne({
            where: {
                park_code: parkCode
            },
            include: {
                model: Comment,
            }
        });
        if (park) {
            return park;
        }
        const parkData = await getParksByParkCode(parkCode);
        return await Park.create({
            park_code: parkData.data[0].parkCode,
            park_name: parkData.data[0].fullName,
            park_description: parkData.data[0].description,
            park_image: parkData.data[0].images[0].url,
            park_website: parkData.data[0].url
        });
    }
}