const Sequelize = require('sequelize');
const sequelize = require('../connection');

const CompanyModel = sequelize.define(
    'company',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        name: {
            type: Sequelize.STRING(50),
            allowNull: false,
        },
        inn: {
            type: Sequelize.STRING(10),
            allowNull: false,
        },
        kpp: {
            type: Sequelize.STRING(12),
            allowNull: false,
        },
        okpo: {
            type: Sequelize.STRING(10),
            allowNull: false,
        },
    },
    {
        timestamps: false,
    }
);

module.exports = CompanyModel;