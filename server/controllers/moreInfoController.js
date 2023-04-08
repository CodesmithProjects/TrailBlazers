const fetch = require('node-fetch');
const openWeatherKey = require('../api/apiKeys/openWeather.js')

const moreInfoController = {};

moreInfoController.getMoreInfo = async (req, res, next) => {
  try {
    const id = req.params.id;
    const options = { 
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '4ac30dd25amsha3ddf95ba050838p145c07jsn8d93d2b2c1c0',
        'X-RapidAPI-Host': 'trailapi-trailapi.p.rapidapi.com'
      }
    };
    
    const result = await fetch(`https://trailapi-trailapi.p.rapidapi.com/trails/${id}`, options);
    let resultJSON = await result.json();
    delete resultJSON['results']
    resultJSON['data'] = resultJSON['data'].map(elem => {
      return {
      'id' : elem['id'],
      'name': elem['name'],
      'url': elem['url'],
      'length': elem['length'],
      'description': (elem['description']).replace(/<\/?[^>]+(>|$)/g, "").replace(/\n/g, '').replace(/\r/g, ''),
      'city': elem['city'],
      'state': elem['region'],
      'difficulty': elem['difficulty'],
      'thumbnail': elem['thumbnail'],
      'features': elem['features'],
      // 'rating': elem['rating'],
      // 'currTemp': elem['main']['temp'],
      // 'maxTemp': elem['main']['temp_max'],
      // 'minTemp': elem['main']['temp_min']
      }
    });
    // const weatherAPI = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${resultJSON['lat']}&lon=${resultJSON['lon']}&appid=${openWeatherKey.apiKey}&units=imperial`)
    // const weatherAPIJSON = await weatherAPI.json();
    // console.log(weatherAPIJSON);
    res.locals.moreInfo = resultJSON;
    console.log(resultJSON);
    return next();
  } catch(err) {
    console.log(err);
    return next({log: 'error at getMoreInfo middleware', message: 'fetch request to trail info API failed'})
  }
}

module.exports = moreInfoController;