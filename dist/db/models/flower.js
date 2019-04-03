'use strict';

module.exports = function (sequelize, DataTypes) {
  var Flower = sequelize.define('Flower', {
    type: DataTypes.STRING,
    price: DataTypes.INTEGER,
    information: DataTypes.STRING,
    image: DataTypes.STRING
  }, { tableName: "flowers" });
  Flower.associate = function (models) {
    Flower.belongsTo(models.Store, {
      foreignKey: "store_id"
    });
  };
  return Flower;
};