const Sequelize = require('sequelize');
const sequelize = require('../connection');

const MatzapasBodyModel = sequelize.define(
    'matzapasbody',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        materialID: {
            type: Sequelize.INTEGER,
            foreignKey: true,
            allowNull: false
        },
        unit: {
            type: Sequelize.STRING(8),
            allowNull: false,
        },
        norma: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        count: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        price: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        sum: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        issue: {
            type: Sequelize.STRING(255),
            allowNull: false,
        },
        debet: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        credit: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        matzapasHeaderID: {
            type: Sequelize.INTEGER,
            foreignKey: true,
            allowNull: false,
        },
    },
    {
        timestamps: false,
    }
);

module.exports = MatzapasBodyModel;