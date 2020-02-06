const { UserHotel } = require('../models')

module.exports = (req, res, next) {
   UserHotel.findOne({
      where : {
         id : req.params.id
      }
   })
      .then (data => {
         // console.log(data);
         
         if (!data) {
            next({code : 404, message: `there's no Hotel with id ${req.params.id}`})
         }
         else {
            if (data.UserId !== req.currentUserId) {
               next({code : 401})
            }
            else {
               next()
            }
         }
      })
      .catch (err => {
         next(err)
      })
}