const openWeatherKey = require("../api/apiKeys/openWeather");
const fetch = require('node-fetch')

const locationWeatherController = {};

locationWeatherController.getLocationInfo = async (req, res, next) => {
  try {
    const result = await fetch(`${res.locals.geoCodeURL}`);
    // const testResult = await fetch('http://api.openweathermap.org/geo/1.0/zip?zip=33418,US&appid=0b1eb3a99d71be41648cbac00d479538&units=imperial')
    const resultJSON = await result.json()
    res.locals.lat = resultJSON.lat;
    res.locals.lon = resultJSON.lon;
    console.log('lat is', res.locals.lat, 'lon is', res.locals.lon)
    // const data = await fetch(
    //   `https://api.openweathermap.org/data/2.5/weather?lat=${result.lat}&lon=${result.lon}&appid=${openWeatherKey}&units=imperial`
    // ).then((data) => data.json());
    // console.log(`result: `, result);

    // const tempObj = {
    //   currTemp: data.main.temp,
    //   maxTemp: data.main.temp_max,
    //   minTemp: data.main.temp_min,
    // };
    // return tempObj;
    return next();
  } catch {
    return next({log: 'error at getLocationInfo middleware', message: 'failed to get lat/lon from weather API'})
  }
};

locationWeatherController.getGeoCodeURL = (req, res, next) => {
  try {
    const zipCode = Number(req.params.zip);
    if (typeof zipCode !== 'number' || zipCode.toString().length !== 5) {
      return next({log: 'error at getGeoCodeURL middleware', message: 'bad zipcode format'})
    }
    console.log('this is input zip code', zipCode);
    const geoCodeURL = `http://api.openweathermap.org/geo/1.0/zip?zip=${zipCode},US&appid=${openWeatherKey.apiKey}&units=imperial`;
    res.locals.geoCodeURL = geoCodeURL;
    return next();
  } catch {
    return next({log: 'error at getGeoCodeURL middleware', message: `failed to make geoCodeURL`});
  }
};



module.exports = locationWeatherController;