const { UserHotel } = require('../models')
const { User } = require('../models')
const { Hotel } = require('../models')
const axios = require('axios')

class UserHotelController {
   static findAll(req, res, next) {
      User.findAll({
         where: { id: req.currentUserId },
         attributes: ['id', 'name'],
         include: [
            {
               model: UserHotel,
               include: [Hotel]
            }
         ]
      })
         .then(user => {
            if (user[0].UserHotels.length) {
               res.status(200).json({
                  data: user,
                  message: `Success get all hotels for user ${user[0].name}`
               })
            } else {
               res.status(200).json({
                  data: [],
                  message: `No booking for user ${user[0].name}`
               })
            }
         })
         .catch(next)
   }

   static findOne(req, res, next) {
      const userHotelId = req.params.id;
      UserHotel.findOne({
         where: { id: userHotelId }
      })
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