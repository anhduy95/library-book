var express = require('express');
var router = express.Router();
var controller = require('../controllers/user.controller');
var validate = require('../validate/user.validate');

router.get('/', controller.index);
router.get('/add', controller.add);
router.post("/create", validate.create, controller.create);
router.get('/:id/delete', controller.delete);

module.exports = router;