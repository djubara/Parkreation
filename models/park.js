const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connections');

class Park extends Model {}

Park.init(
    {
        fullName: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          description: {
            type: DataTypes.TEXT,
            allowNull: false,
          },
          parkCode: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
          },
          imageUrl: {
            type: DataTypes.STRING,
            allowNull: true,
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