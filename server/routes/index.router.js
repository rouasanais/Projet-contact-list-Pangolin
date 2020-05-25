const express = require('express');
const router = express.Router();

const ctrlUser = require('../controllers/user.controller');
const ctrAdmin = require('../controllers/admin.controller');

const jwtHelper = require('../config/jwtHelper');

router.post('/register', ctrlUser.register);
router.post('/authenticate', ctrlUser.authenticate);
router.post('/authenticateadmin', ctrAdmin.authenticate);
router.post('/registeradmin', ctrAdmin.register);


module.exports = router;



