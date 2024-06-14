const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connections');

class Park extends Model { }

Park.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        park_code: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        park_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        park_website: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        park_description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        park_image: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'park',
    }
);

module.exports = Park;