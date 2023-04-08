const openWeatherKey = require("./apiKeys/openWeather");

const convertZipCode = async (url) => {
  try {
    const result = await fetch(url).then((data) => data.json());
    const data = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${result.lat}&lon=${result.lon}&appid=${openWeatherKey}&units=imperial`
    ).then((data) => data.json());
    console.log(`result: `, result);

    const tempObj = {
      currTemp: data.main.temp,
      maxTemp: data.main.temp_max,
      minTemp: data.main.temp_min,
    };
    return tempObj;
  } catch (err) {
    console.log("ERROR", err);
  }
};

const runConvertZipCodeFunc = async (zipCode, countryCode) => {
  const geoCodeURL = `http://api.openweathermap.org/geo/1.0/zip?zip=${zipCode},${countryCode}&appid=${openWeatherKey}&units=imperial`;
  const result = await convertZipCode(geoCodeURL);
  console.log(`this is the invocation of convertZipCode: `, result);
  return result;
};

console.log('this is the invocation of runConvertZipCodeFunc', runConvertZipCodeFunc(94583, 'US'));


module.exports = runConvertZipCodeFunc;