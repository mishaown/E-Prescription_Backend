const router = require('express').Router();

const { getDoctorAppointment, doctorAppointment } = require('../controllers/Appoinments');
const { getPeopleMedData } = require('../controllers/MedProfile');
router
    .route('/appointment/:id')
    .get(getDoctorAppointment)
    .post(doctorAppointment)

router
    .route('/people')
    .get(getPeopleMedData)

module.exports = router;
