const express = require('express')
const bikeController = require('../controllers/bikeTrailsController')
const locationWeatherController = require('../controllers/locationWeatherController.js')

const bikeTrailsRoute = express.Router();

bikeTrailsRoute.get('/:zip', 
locationWeatherController.getGeoCodeURL, locationWeatherController.getLocationInfo, bikeController.getTrails, 
(req, res) => {
    return res.status(200).json(res.locals.trails);
})


module.exports = bikeTrailsRoute