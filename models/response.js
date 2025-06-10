'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Response extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Response.belongsTo(models.User, { foreignKey: 'userId' });
      Response.belongsTo(models.Survey, { foreignKey: 'surveyId' });
    }
  }
  Response.init({
    userId: DataTypes.INTEGER,
    surveyId: DataTypes.INTEGER,
    answers: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Response',
  });
  return Response;
};