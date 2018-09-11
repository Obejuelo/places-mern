const express = require('express')
const router = express.Router();
const userController = require('../controllers/userController');
const sessionController = require('../controllers/sessionController');

/* GET users listing. */
router.route('/')
  .post(userController.create,
    sessionController.generateToken,
    sessionController.sendToken
  )
  // .get(userController.myPlaces)  //obtener lugares por usuario

module.exports = router;
