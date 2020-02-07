const { User, UserHotel, Hotel } = require('../models');

class BookingController {
  static findAll(req, res, next) {
    Hotel.findAll({
      include: [
        {
          model: UserHotel,
          include: [User]
        }
      ]
    })
      .then(hotels => {
        res.status(200).json({
          data: hotels,
          message: "Success get all hotels"
        })
      })
      .catch(next)
  }

  static findOne(req, res, next) {
    const hotelId = req.params.id;
    Hotel.findOne({
      where: {
        id: hotelId
      },
      include: [
        {
          model: UserHotel,
          include: [User]
        }
      ]
    })
      .then(data => {
        res.status(200).json({
          data,
          message: "Success get data"
        })
      })
      .catch(next);
  }

  static delete(req, res, next) {

  }
}

module.exports = BookingController;