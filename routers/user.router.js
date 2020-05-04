var express = require('express');
var router = express.Router();
var controller = require('../controllers/user.controller');
var validate = require('../validate/user.validate');
var middlewareAdmin = require('../middleware/isAdmin.middleware');

router.get('/', controller.index);
router.get('/add', middlewareAdmin.isAdminUser, controller.add);
router.post("/create", validate.create, controller.create);
router.get('/:id/delete', middlewareAdmin.isAdminUser, controller.delete);

module.exports = router;