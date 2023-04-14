const express = require('express');
const reviewController = require('../controllers/reviewController');
const sessionController = require('../controllers/sessionController');
const bikeTrailsController = require('../controllers/bikeTrailsController');

const dbRouter = express.Router();

dbRouter.get('/getAllFavoriteTrails', bikeTrailsController.getFavTrails, (req, res) => {
  return res.status(200).json(res.locals.data);
})

dbRouter.post('/saveFavoriteTrail', sessionController.checkSession, bikeTrailsController.saveTrails, (req, res) => {
  return res.status(200).json(res.locals.isSaved);
})

dbRouter.delete('/deleteFavoriteTrail/:trailId', sessionController.checkSession, bikeTrailsController.deleteTrails, (req, res) => {
  return res.status(200).json(res.locals.isDeleted);
})

dbRouter.post('/createReview/:trailID', sessionController.checkSession, reviewController.createReview, (req, res) => {
  console.log('review created')
  return res.status(201).json('created review')
})

module.exports = dbRouter;