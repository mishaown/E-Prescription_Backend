const router = require('express').Router();

const { getDoctorAppointment, doctorAppointment } = require('../controllers/Appoinments');

router
    .route('/appointment/:id')
    .get(getDoctorAppointment)
    .post(doctorAppointment)

module.exports = router;
