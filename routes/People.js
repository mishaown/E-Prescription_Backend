const router = require('express').Router();

const { getAllPeople, getPeople } = require('../controllers/People');
const { registerUser } = require('../controllers/Registration');
const { loginUser } = require('../controllers/Login');

router
    .route('/get')
    .get(getAllPeople)

router
    .route('/:id')
    .get(getPeople)

router
    .route('/reg')
    .post(registerUser)

router
    .route('/login')
    .post(loginUser)

module.exports = router;