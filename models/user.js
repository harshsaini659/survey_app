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
    role: {
      type: DataTypes.ENUM('coordinator', 'respondent'),
      validate: {
        isIn: {
          args: [['coordinator', 'respondent']],
          msg: 'Role must be either coordinator or respondent'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });

  return User;
};