   require('dotenv').config()

const express = require ('express')
const app = express()
const cors = require('cors')
// const router = require ('./routes')
// const errorHandler = require('./middlewares/errorHandler.js')


app.use(cors())
app.use(express.urlencoded({extended : false}))
app.use(express.json())

// =======================================================
// app.use('/', router)
// app.use('/', errorHandler)


// ======================================================

app.listen(process.env.PORT, () => {
   console.log(`connected to port ${process.env.PORT}`);
})