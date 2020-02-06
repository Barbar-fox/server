const { User } = require('../models')


class UserController {
   static register (req, res, next) {
      let newUser = {
         name: req.body.name,
         email: req.body.email,
         password: req.body.password
      }
      User.create(newUser)
         .then(data => {
            console.log(data, `new User`);
            res.status(201).json(data)
         })
         .catch(err => [
            next(err)
         ])
   }
}

module.exports = UserController