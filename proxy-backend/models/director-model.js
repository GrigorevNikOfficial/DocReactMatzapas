const Sequelize = require('sequelize');
const sequelize = require('../connection');

const DirectorModel = sequelize.define(
    'director',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        firstName: {
            type: Sequelize.STRING(25),
            allowNull: false,
        },
        lastName: {
            type: Sequelize.STRING(25),
            allowNull: false,
        },
        patronymic: {
            type: Sequelize.STRING(25),
            allowNull: true,
        },
        department: {
            type: Sequelize.STRING(50),
            allowNull: false,
        },
    },
    {
        timestamps: false,
    }
);

module.exports = DirectorModel;