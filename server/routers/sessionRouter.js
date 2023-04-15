const express = require('express');
// const sessionController = require('../controllers/sessionController');
const cookieController = require('../controllers/cookieController');
const sessionRouter = express.Router();
const accountController = require('../controllers/accountController')

sessionRouter.get('/', cookieController.createCookie, (req, res) => {
  return res.status(200).json('completed');
})

module.exports = sessionRouter;