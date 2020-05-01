var express = require('express');
var router = express.Router();
var controller = require('../controllers/transaction.controller');
var validate = require('../validate/transaction.validate');

router.get('/', controller.index);
router.get('/create', controller.create);
router.post("/create", controller.postCreate);
router.get('/:id/complete', validate.checkId ,controller.complete);

module.exports = router;