const express = require('express')
const router = express.Router()

const userRouter = require('./users')
const hotelRouter = require('./hotels')
// const bookingRouter = require('./bookings')

router.use('/users', userRouter)
router.use('/hotels', hotelRouter)
// router.use('/bookings', bookingRouter)

module.exports = router