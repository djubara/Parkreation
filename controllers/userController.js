const { create } = require("handlebars");

module.exports = {
    async getUserByID(userID) {
        // TODO sequelize query to get user by ID
    },
    async getUserByEmail(userEmail) {
        // TODO sequelize query to get user by email
    },
    async createUser(userData) {
        // TODO sequelize query to create a new user
    },  // TODO Modeler to create a new user columns
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