'use strict';
module.exports = (sequelize, DataTypes) => {
  class Hotel extends sequelize.Sequelize.Model {
    static associate(models) {
      Hotel.hasMany(models.UserHotel)
    }
  }

  Hotel.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { args: true, msg: "Name should not null" },
        notEmpty: { args: true, msg: "Name should not empty" }
      }
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { args: true, msg: "Location should not null" },
        notEmpty: { args: true, msg: "Location should not empty" }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { args: true, msg: "Price should not null" },
        min: { args: 1, msg: "Price cannot negative" }
      }
    }
  }, {
    sequelize
  })
  return Hotel;
};