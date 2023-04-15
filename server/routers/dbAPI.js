const express = require('express');
const accountController = require('../controllers/accountController')
const reviewController = require('../controllers/reviewController');

const bikeTrailsController = require('../controllers/bikeTrailsController');

const dbRouter = express.Router();

dbRouter.get('/getAllFavoriteTrails', bikeTrailsController.getFavTrails, (req, res) => {
  return res.status(200).json(res.locals.data);
})

dbRouter.post('/saveFavoriteTrail', bikeTrailsController.saveTrails, (req, res) => {
  return res.status(200).json(res.locals.isSaved);
})

dbRouter.delete('/deleteFavoriteTrail/:trailId', bikeTrailsController.deleteTrails, (req, res) => {
  return res.status(200).json(res.locals.isDeleted);
})

dbRouter.get('/createAccount', accountController.createAccount, (req, res) => {
  return res.status(200).json('made Account');
})

dbRouter.post('/createReview/:trailID', reviewController.createReview, (req, res) => {
  console.log('review created')
  return res.status(201).json('created review')
})

module.exports = dbRouter;