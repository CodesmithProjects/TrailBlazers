const express = require('express');
const reviewController = require('../controllers/reviewController');

const bikeTrailsController = require('../controllers/bikeTrailsController');
const sessionController = require('../controllers/sessionController');

const dbRouter = express.Router();

dbRouter.get('/getAllFavoriteTrails', sessionController.authenticateUser, bikeTrailsController.getFavTrails, (req, res) => {
  return res.status(200).json(res.locals.data);
})

dbRouter.post('/saveFavoriteTrail', sessionController.authenticateUser, bikeTrailsController.saveTrails, (req, res) => {
  return res.status(200).json(res.locals.isSaved);
})

dbRouter.delete('/deleteFavoriteTrail/:trailId', sessionController.authenticateUser, bikeTrailsController.deleteTrails, (req, res) => {
  return res.status(200).json(res.locals.isDeleted);
})

dbRouter.post('/createReview/:trailID', sessionController.authenticateUser, reviewController.createReview, reviewController.addPhotos, (req, res) => {
  return res.status(201).json('created review')
})

dbRouter.get('/uploadURL', reviewController.uploadURL, (req, res) => {
  return res.status(200).json(res.locals.uploadURL)
})

dbRouter.delete('/deleteReview/:trail_reviewID', sessionController.authenticateUser, reviewController.deleteReview, (req, res) => {
  return res.status(201).json('deleted review')
})

module.exports = dbRouter;