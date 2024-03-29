'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.user.belongsTo(models.states,{
        foreignKey: 'states'
      });

      models.user.belongsTo(models.city,{
        foreignKey: 'cities'
      });
    }
  };
  user.init({
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    mobile_no: DataTypes.STRING,
    states: DataTypes.STRING,
    cities: DataTypes.STRING,
    picture: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};