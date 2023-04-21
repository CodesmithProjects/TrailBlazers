const fetch = require('node-fetch');

const locationWeatherController = {};

locationWeatherController.getLocationInfo = async (req, res, next) => {
  try {
    const result = await fetch(`${res.locals.geoCodeURL}`);
    const resultJSON = await result.json();
    res.locals.lat = resultJSON.lat;
    res.locals.lon = resultJSON.lon;
    console.log('getLocationInfo lat is', res.locals.lat, 'lon is', res.locals.lon);
    return next();
  } catch {
    return next({
      log: 'error at getLocationInfo middleware',
      message: 'failed to get lat/lon from weather API',
    });
  }
};

locationWeatherController.getGeoCodeURL = (req, res, next) => {
  try {
    const zipCode = Number(req.params.zip);
    if (typeof zipCode !== 'number' || zipCode.toString().length !== 5) {
      return next({
        log: 'error at getGeoCodeURL middleware',
        message: 'bad zipcode format',
      });
    }
    console.log('this is input zip code', zipCode);
    const geoCodeURL = `http://api.openweathermap.org/geo/1.0/zip?zip=${zipCode},US&appid=${process.env.OPEN_WEATHER_API_KEY}&units=imperial`;
    res.locals.geoCodeURL = geoCodeURL;
    return next();
  } catch {
    return next({
      log: 'error at getGeoCodeURL middleware',
      message: `failed to make geoCodeURL`,
    });
  }
};

module.exports = locationWeatherController;
