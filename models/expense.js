const Sequelize = require('sequelize');

const sequelize = require('../utill/database');

const Expense = sequelize.define('expense',{
    id : {
        type : Sequelize.INTEGER,
        autoIncrement : true,
        allowNull : false,
        primaryKey : true
    },
    amount : Sequelize.STRING,
    description : Sequelize.STRING,
    categary : Sequelize.STRING
});


module.exports = Expense ;



