const { Comment, Visit, Wish, Park } = require("../models");
const User = require("../models/users");

module.exports = {
    async getUserByID(userID) {
        return await User.findByPk(userID, {
            include: [{
                model: Comment
            }, {
                model: Park,
                as: "visited"
            }, {
                model: Park,
                as: "wishlist"
            }]
        });
    },
    async getUserByEmail(userEmail) {
        // TODO sequelize query to get user by email
    },
    createUser: async (userData) => {
        try {
            const newUser = await User.create(userData);
            return newUser;
        } catch (err) {
            console.log(err);
            return err;
        }
    },
    async deleteUser(userID) {
        // TODO sequelize query to delete a user
    },
    async updateUser(userData) {
        // TODO sequelize query to update a user
    },
};