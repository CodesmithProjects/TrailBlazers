const express = require('express');
const sessionController = require('../controllers/sessionController');
const cookieController = require('../controllers/cookieController');
const sessionRouter = express.Router();

sessionRouter.get('/', cookieController.createCookie, sessionController.createSession, (req, res) => {
  return res.status(200).json('completed');
})

sessionRouter.get('/deleteOldSessions', sessionController.deleteOldSessions, (req, res) => {
    return res.status(200).json('deleted old sessions');
  })

module.exports = sessionRouter;