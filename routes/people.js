var express = require('express');
var router = express.Router();

const peopleController = require('../controllers/people.js');

router.get('/', peopleController.listPeople);
router.post('/people/', peopleController.insert);
router.post('/people/:id/contacts', peopleController.insertContact2);
router.get('/contacts', peopleController.search);

module.exports = router;