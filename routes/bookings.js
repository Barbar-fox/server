const express = require ('express')
const router = express.Router()
const userHotelController = require ('../controllers/userHotelController')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

router.use(authentication)
router.post('/', userHotelController.create)
router.put('/:id',authorization ,userHotelController.update)

module.exports = router