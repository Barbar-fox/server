const { UserHotel } = require('../models')
const { User } = require('../models')
const { Hotel } = require('../models')

class UserHotelController {
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

   static create(req, res, next) {
      let newBooking = {
         HotelId: req.body.HotelId,
         UserId: req.currentUserId,
         date: req.body.date
      }
      UserHotel.create(newBooking)
         .then(data => {
            console.log(data);
            res.status(201).json(data)
         })
         .catch(err => {
            next(err)
         })
   }

   static update(req, res, next) {
      let updateBooking = {
         HotelId: req.body.HotelId,
         UserId: req.currentUserId,
         date: req.body.date
      }

      UserHotel.update(updateBooking, {
         where: {
            id: req.params.id
         }
      })
         .then(data => {
            res.status(201).json(data)
         })
         .catch(err => {
            next(err)
         })
   }
}

module.exports = UserHotelController