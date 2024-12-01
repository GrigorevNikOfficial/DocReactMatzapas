const Sequelize = require('sequelize');
const sequelize = require('../connection');

const MatzapasHeaderModel = sequelize.define(
    'matzapasheader',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        number: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        date: {
            type: Sequelize.DATE,
            allowNull: false,
        },
        directorID: {
            type: Sequelize.INTEGER,
            foreignKey: true,
            allowNull: false
        },
        signatureDate: {
            type: Sequelize.DATE,
            allowNull: false,
        },
        copmanyID: {
            type: Sequelize.INTEGER,
            foreignKey: true,
            allowNull: false,
        },
        commission: {
            type: Sequelize.STRING(255),
            allowNull: false,
        },
        orderDate: {
            type: Sequelize.DATE,
            allowNull: false,
        },
        orderNumber: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        responseP: {
            type: Sequelize.STRING(255),
            allowNull: false
        },
        structuralUnit: {
            type: Sequelize.STRING(255),
            allowNull: false
        },
        commissionM: {
            type: Sequelize.STRING(255),
            allowNull: false
        },
    },
    {
        timestamps: false,
    }
);

module.exports = MatzapasHeaderModel;