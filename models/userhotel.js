'use strict';
module.exports = (sequelize, DataTypes) => {
  class UserHotel extends sequelize.Sequelize.Model {
    static associate(models) {
      UserHotel.belongsTo(models.Hotel);
      UserHotel.belongsTo(models.User);
    }
  }

  UserHotel.init({
    HotelId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { args: true, msg: "Hotel Id cannot null" }
      }
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { args: true, msg: "User Id cannot null" }
      }
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: { args: true, msg: "Date cannot null" },
        isDate: { args: true, msg: "Invalid date" },
        isAfter: { args: new Date(), msg: "Invalid date" }
      }
    }
  }, {
    sequelize
  })
  return UserHotel;
};