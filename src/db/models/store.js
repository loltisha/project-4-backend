'use strict';
module.exports = (sequelize, DataTypes) => {
  const Store = sequelize.define('Store', {
    store_name: DataTypes.STRING,
    phone: DataTypes.INTEGER,
    location: DataTypes.STRING,
    email: DataTypes.STRING,
    image: DataTypes.STRING

  },
  {tableName:"stores"}
  );

  Store.associate = function(models) {
    Store.belongsTo(models.User, {
      foreignKey:"user_id"
    });
    Store.hasMany(models.Flower, {
      foreignKey: "store_id"
    });
  };
  return Store;
};