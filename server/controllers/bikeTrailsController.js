// const fetch = require('node-fetch');
// import * as fetch from 'node-fetch'

const bikeController = {};

bikeController.getTrails = async (req, res, next) => {
    try {
        const url = `https://trailapi-trailapi.p.rapidapi.com/trails/explore/?lat=%3C${res.locals.lat}%3E&lon=%3C${res.locals.lon}%3E`;
        const options = {
            method: 'GET',
            headers: {
              'X-RapidAPI-Key': '4ac30dd25amsha3ddf95ba050838p145c07jsn8d93d2b2c1c0',
              'X-RapidAPI-Host': 'trailapi-trailapi.p.rapidapi.com'
            }
          };
        const trailsAPIResponse = await fetch(url, options).json();
        res.locals.trails = trailsAPIResponse;
        return next();
    } catch {
        return next({log: 'error at bikeController.getTrails middleware', message: 'fetch request to moreInfo trails API failed'})
    }
}

bikeController.getTrailInfo = (req, res, next) => {

}
module.exports = bikeController;