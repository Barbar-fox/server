const { Hotel } = require('../models')

class HotelController {
   static getAll(req, res, next) {
      Hotel.findAll()
         .then(data => {
            res.status(200).json(data)
         })
         .catch(err => {
            next(err)
         })
   }

   static create(req, res, next) {
      let newHotel = {
         name: req.body.name,
         location: req.body.location,
         price: req.body.price
      }
      Hotel.create(newHotel)
         .then(data => {
            res.status(201).json(data)
         })
         .catch(err => {
            next(err)
         })
   }

   static getOne(req, res, next) {
      Hotel.findOne({
         where: {
            id: req.params.id
         }
      })
         .then(data => {
            if (data) {
               res.status(200).json(data)
            }
            else {
               next({ code: 404, message: `hotel with id ${req.params.id} doesn't exists` })
            }
         })
         .catch(err => {
            next(err)
         })
   }

   static update(req, res, next) {
      if (!req.body.name || !req.body.location || !req.body.price) {
         next({ code: 400 })
      }

      let updateHotel = {
         name: req.body.name,
         location: req.body.location,
         price: req.body.price
      }

      Hotel.update(updateHotel, {
         where: {
            id: req.params.id
         }
      })
         .then(data => {
            if (data[0] < 1) {
               next({ code: 404, message: `Hotel with id ${req.params.id} doesn't exists` })
            }
            else {
               res.status(201).json({ msg: `Hotel with id ${req.params.id} has been updated` })
            }
         })
         .catch(err => {
            next(err)
         })
   }

   static deleteOne(req, res, next) {
      Hotel.destroy({
         where: {
            id: req.params.id
         }
      })
         .then(data => {
            console.log(data, `ini lhoooooooo`);
            
            if (data < 1) {
               next({ code: 404, message: `Hotel with id ${req.params.id} doesn't exists` })
            }
            else {
               res.status(200).json({ msg: `Hotel with id ${req.params.id} has been deleted` })
            }
         })
         .catch(err => {
            next(err)
         })
   }
}

module.exports = HotelController