const express = require('express');
const cookieController = require('../controllers/cookieController');
const sessionController = require('../controllers/sessionController')
const sessionRouter = express.Router();

sessionRouter.get('/', cookieController.createCookie, sessionController.createSession, (req, res) => {
  return res.status(200).json('completed');
})

module.exports = sessionRouter;