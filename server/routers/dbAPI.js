const express = require('express');

const bikeTrailsController = require('../controllers/bikeTrailsController');

const dbRouter = express.Router();

dbRouter.get('/getAllFavoriteTrails', bikeTrailsController.getFavTrails, (req, res) => {
  return res.status(200).json(res.locals.data);
})

dbRouter.post('/saveFavoriteTrail', bikeTrailsController.saveTrails, (req, res) => {
  res.status(200).json(res.locals.isSaved);
})

dbRouter.delete('/deleteFavoriteTrail/:trailId', bikeTrailsController.deleteTrails, (req, res) => {
  res.status(200).json(res.locals.isDeleted);
})

module.exports = dbRouter;