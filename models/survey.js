'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Survey extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Survey.belongsTo(models.User, { foreignKey: 'coordinatorId' });
      Survey.hasMany(models.Question, { foreignKey: 'surveyId' });
      Survey.hasMany(models.Response, { foreignKey: 'surveyId' });
    }
  }
  Survey.init({
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    targetGender: DataTypes.STRING,
    minAge: DataTypes.INTEGER,
    maxAge: DataTypes.INTEGER,
    coordinatorId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Survey',
  });
  return Survey;
};