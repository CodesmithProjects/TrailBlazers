const express = require('express');
const moreInfoController = require('../controllers/moreInfoController');
const bikeTrailInfoRouter = express.Router();

bikeTrailInfoRouter.get('/:id', moreInfoController.getMoreInfo, moreInfoController.getUserPhotos, (req, res) => {
  return res.status(200).json(res.locals.moreInfo);
})

module.exports = bikeTrailInfoRouter;