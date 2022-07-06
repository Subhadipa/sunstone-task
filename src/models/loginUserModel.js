const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../util/localConn");


class UserCreate extends Model { }

UserCreate.init({


  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false

  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false

  },
  token: {
    type: DataTypes.STRING,
    defaultValue: " "
  }
}, {

  sequelize,
  modelName: 'usercreate'
});
module.exports = UserCreate


