const router = require('express').Router();

const { getAllPeople, getPeople } = require('../controllers/People');

router
    .route('/get')
    .get(getAllPeople)

router
    .route('/:id')
    .get(getPeople)

module.exports = router;