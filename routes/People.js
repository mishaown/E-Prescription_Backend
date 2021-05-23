const router = require('express').Router();
const { protect, authorize } = require('../middleware/authentication');

const { getAllPeople, getPeople } = require('../controllers/People');
const { registerUser } = require('../controllers/Registration');
const { loginUser } = require('../controllers/Login');
const { getUserPrescriptions } = require('../controllers/Prescription');

router.get('/get', getAllPeople);
router.get('/get/:id', getPeople);

router.post('/reg', registerUser);
router.post('/login', loginUser);

router.get('/prescription', protect, authorize('patient'), getUserPrescriptions);

module.exports = router;