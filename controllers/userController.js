const { User } = require('../models')
const bcrypt = require ('bcryptjs')
const jwt = require ('jsonwebtoken')
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);


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

   static login (req, res, next) {
      User.findOne({
         where : {
            email : req.body.email
         }
      })
         .then(data => {
            if (!data) {
               next({code: 404, message: `email / password is wrong`})
            } 
            else {
               const verified = bcrypt.compareSync(req.body.password, data.password);
               if (!verified) {
                  next({code: 404, message: `email / password is wrong`})
               }
               else {
                  const token = jwt.sign({ id: data.id }, process.env.JWT_SECRET);
                  res.status(200).json({token})
               }
            }
         })
         .catch(err => {
            next(err)
         })
   }

   static gSignIn (req, res, next) {
      // console.log(req.headers.idtoken, `ini dari clienttttttttttt`);
      
      let email
      client.verifyIdToken({
         idToken: req.headers.idtoken,
         audience: process.env.CLIENT_ID
      })
         .then(data => {
            email = data.payload.email

            return User.findOne({
               where : {
                  email
               }
            })
         })
         .then(user => {
            if (!user) {
               console.log(`user baru`);
               let newUser = {
                  email, password: process.env.SECRET_PASSWORD
               }
               return User.create(newUser)
            }
            else {
               return user
            }
         })
         .then(userLogin => {
            let token = jwt.sign({ id: userLogin.id }, process.env.JWT_SECRET);
            res.status(200).json({token})
         })
         .catch(err => {
            next(err)
         })
   }
}

module.exports = UserController