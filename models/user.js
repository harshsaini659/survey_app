'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Response, { foreignKey: 'userId' });
      User.hasMany(models.Survey, { foreignKey: 'coordinatorId' });
    }
  }

  User.init({
    name: DataTypes.STRING,
    email: { type: DataTypes.STRING, unique: true },
    password: DataTypes.STRING,
    gender: DataTypes.STRING,
    age: DataTypes.INTEGER,
    role: DataTypes.ENUM('coordinator', 'respondent')
  }, {
    sequelize,
    modelName: 'User',
  });

  return User;
};
