
const Sequelize = require('sequelize');
const sequelize = new Sequelize('nodetask','root','',{
    dialect : 'mysql',
    host : 'localhost'
})


module.exports = sequelize;


