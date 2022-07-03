const Sequelize  = require('sequelize');

const sequelize = new Sequelize('practice_db', 'root', 'subhadipa', {
    host: 'localhost',
    dialect:'mysql' 
  });
  (async () => {
  try {
   await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
    })();

module.exports =sequelize
  