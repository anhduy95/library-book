var express = require('express');
var router = express.Router();
var controller = require('../controllers/transaction.controller');
var validate = require('../validate/transaction.validate');
var middlewareAdmin = require('../middleware/isAdmin.middleware');

router.get('/', middlewareAdmin.isAdminTran, controller.index);
router.get('/create', middlewareAdmin.isAdminTranCreate, controller.create);
router.post("/create", controller.postCreate);
router.get('/:id/complete',middlewareAdmin.isAdminTranDone, validate.checkId ,controller.complete);

module.exports = router;