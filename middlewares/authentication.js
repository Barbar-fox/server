const jwt = require('jsonwebtoken')
const { User } = require('../models')

module.exports = (req, res, next) => {
   try {
      const token = req.headers.token
      let decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (decoded) {
         req.currentUserId = decoded.id
         User.findOne({
            where: {
               id: req.currentUserId
            }
         })
            .then(data => {
               if (data) {
                  next()
               }
               else {
                  next({ code: 404, msg: `user with id ${req.currentUserId} doesn't exists` })
               }
            })
            .catch(err => {
               next(err)
            })
      }
   }
   catch (err) {
      // console.log(`masuk sini dong`);
      next(err)
   }
}