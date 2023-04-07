const openWeatherKey = require("../api/apiKeys/openWeather");

const locationWeatherController = {};

locationWeatherController.getLocationInfo = async (req, res, next) => {
  try {
    // const result = await fetch(url).then((data) => data.json());
    const result = await fetch(res.locals.geoCodeURL).json();
    res.locals.lat = result.lat;
    res.locals.long = result.lon;
    console.log('lat is', res.locals.lat, 'long is', res.locals.long)
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

locationWeatherController.getGeoCodeURL = async (req, res, next) => {
  try {
    const zipCode = Number(req.params.zip);
    console.log(typeof zipCode);
    if (typeof zipCode !== 'number' || zipCode.toString().length !== 5) {
      return next({log: 'error at getGeoCodeURL middleware', message: 'bad zipcode format'})
    }
    console.log('this is input zip code', zipCode);
    const geoCodeURL = `http://api.openweathermap.org/geo/1.0/zip?zip=${zipCode},us&appid=${openWeatherKey}&units=imperial`;
    res.locals.geoCodeURL = geoCodeURL;
    //   const result = await convertZipCode(geoCodeURL);
    //   console.log(`this is the invocation of convertZipCode: `, result);
    //   return result;
    return next();
  } catch(err) {
    return next({log: 'error at getGeoCodeURL middleware', message: `failed to get geoCodeURL from weather API, ${err}`});
  }
};



module.exports = locationWeatherController;