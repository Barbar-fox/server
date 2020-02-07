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
      const calenderificAPI = `https://calendarific.com/api/v2/holidays?api_key=${process.env.CALENDARIFIC_TOKEN}&country=ID&year=2020`;
      const weatherbitAPI = `https://api.weatherbit.io/v2.0/current?city=Jakarta&country=Indonesia&lang=id&key=${process.env.WEATHERBIT_TOKEN}`;

      let city = '', id = '';
      const zomatoToken = process.env.ZOMATO_TOKEN;
      const zomatoGetCityIdAPI = `https://developers.zomato.com/api/v2.1/locations?query=`;
      const zomatoGetRestoAPI = `https://developers.zomato.com/api/v2.1/collections?city_id=`;

      let userHotel;

      UserHotel.findOne({
         where: { id: userHotelId },
         include: [Hotel, {
            model: User,
            attributes: ['id', 'name']
         }]
      })
         .then(tmpUserHotel => {
            city = tmpUserHotel.Hotel.location;
            userHotel = tmpUserHotel;
            return axios({
               method: 'get',
               url: zomatoGetCityIdAPI + city,
               headers: {
                  'user-key': zomatoToken
               }
            })
         })
         .then(zomato => {
            id = zomato.data.location_suggestions[0].entity_id;
            console.log(zomatoGetRestoAPI + id);
            return axios({
               method: 'get',
               url: zomatoGetRestoAPI + id,
               headers: {
                  'user-key': zomatoToken
               }
            })
         })
         .then(data => {
            const resto = [];
            data.data.collections.forEach((el, index) => {
               if (index !== 0) {
                  resto.push({
                     title: el.collection.title,
                     description: el.collection.description,
                     image_url: el.collection.image_url
                  })
               }
            })
            userHotel.dataValues.resto = resto;
            res.status(200).json(userHotel)
         })
         .catch(next)
   }

   static delete(req, res, next) {
      const userHotelId = req.params.id;
      UserHotel.destroy({
         where: { id: userHotelId }
      })
         .then(userHotel => {
            console.log(userHotel);
            res.status(200).json({
               message: `Success delete bookings with id ${userHotelId}`
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