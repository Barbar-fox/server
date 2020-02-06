const { UserHotel } = require('../models')
const { User } = require('../models')
const { Hotel } = require('../models')

class UserHotelController {
   static create(req, res, next) {
      let newBooking = {
         HotelId : req.body.HotelId,
         UserId : req.currentUserId,
         date : req.body.date
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
         HotelId : req.body.HotelId,
         UserId : req.currentUserId,
         date : req.body.date
      }

      UserHotel.update(updateBooking, {
         where : {
            id : req.params.id
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