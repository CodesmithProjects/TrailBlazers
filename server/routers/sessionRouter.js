const express = require('express');
const sessionRouter = express.Router();
const sessionController = require('../controllers/sessionController');

sessionRouter.get('/currentuser', sessionController.authenticateUser, (req, res) => {
  return res.status(200).json(req.user);  
});

module.exports = sessionRouter;