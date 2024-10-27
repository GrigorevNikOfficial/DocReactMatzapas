const Sequelize = require('sequelize');
const sequelize = require('../connection');

const MaterialModel = sequelize.define(
    'material',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        title: {
            type: Sequelize.STRING(100),
            allowNull: false,
        },
    },
    {
        timestamps: false,
    }
);

module.exports = MaterialModel;