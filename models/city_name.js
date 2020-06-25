'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class city_name extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  city_name.init({
    name: DataTypes.STRING,
    state_id: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'city_name',
  });
  return city_name;
};