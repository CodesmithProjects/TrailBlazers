const express = require('express');

const bikeTrailsController = require('../controllers/bikeTrailsController');

const dbRouter = express.Router();

dbRouter.get('/getAllFavoriteTrails', bikeTrailsController.getFavTrails, (req, res) => {
  return res.status(200).json(res.locals.data);
})

dbRouter.post('/:userID', bikeTrailsController.saveTrails, (req, res) => {
  res.status(200).json(res.locals.data);
})

module.exports = dbRouter;