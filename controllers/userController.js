const User = require("../models/users");

module.exports = {
    async getUserByID(userID) {
        // TODO sequelize query to get user by ID
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