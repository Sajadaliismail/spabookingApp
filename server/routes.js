const express = require('express')
const controller = require('./controller')

const route = express.Router()


route.get('/appointment/:phone',controller.getAppointment)
route.post('/modify-appointment',controller.modifyAppointment)
route.post('/cancel-appointment',controller.cancelAppointment)

route.post('/submit-booking',controller.submitBooking)


module.exports = route
