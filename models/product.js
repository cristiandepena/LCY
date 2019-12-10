const sequelize = require('sequelize');
const db = require('../database/database');

const product = db.define('product',{
    product_id: {
        type: sequelize.INTEGER,
        allowNull: false
    },
    product_description: {
        type: sequelize.STRING,
        allowNull: false
    },
    product_stock: {
        type: sequelize.SMALLINT,
        allowNull: false
    },
    product_price: {
        type: sequelize.FLOAT,
        allowNull: false
    },
    product_active: {
        type: sequelize.BOOLEAN,
        allowNull: false
    },
    createdBy: {
        type: sequelize.SMALLINT,
        allowNull: false
    }

}, {timestamps: true});

module.exports = product;

    