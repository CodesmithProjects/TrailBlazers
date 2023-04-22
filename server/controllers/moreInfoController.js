const fetch = require('node-fetch');
const db = require('../models/bikeTrailsModels');

const moreInfoController = {};

// require('dotenv').config();
// 'X-RapidAPI-Key': process.env.VITE_TRAILAPI_KEY,
// 'X-RapidAPI-Host': process.env.VITE_TRAILAPI_HOST,

// VITE_TRAILAPI_KEY=8e8ae2bc71mshfbc5c59d3dfd9afp1b60cejsnad30f37fbe25
// VITE_TRAILAPI_HOST=trailapi-trailapi.p.rapidapi.com

moreInfoController.getMoreInfo = async (req, res, next) => {
  try {
    const id = req.params.id;
    console.log("id: ", req.params.id); // its working
    const options = { 
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '8e8ae2bc71mshfbc5c59d3dfd9afp1b60cejsnad30f37fbe25',
        'X-RapidAPI-Host': 'trailapi-trailapi.p.rapidapi.com'
      }
    };
    
    console.log("url: ", `https://trailapi-trailapi.p.rapidapi.com/trails/${id}`);
    const result = await fetch(`https://trailapi-trailapi.p.rapidapi.com/trails/${id}`, options);
    let resultJSON = await result.json();
    await console.log("resultJSON: ", resultJSON);
    delete resultJSON['results']
    // const getSQL = `
    //     SELECT * FROM reviews
    //     WHERE trail_id = '${id}'
    //     `
    const getSQL = `
      SELECT r.*, a.name  
        FROM reviews r 
        LEFT JOIN accounts a
        ON r.user_id = a.user_id
        WHERE trail_id = '${id}'
        `
    const getResp = await db.query(getSQL);
    console.log("this is getResp: ", getResp);
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
      'trailEstimate': elem['length'] ? ((Number(elem['length'])/10)*60).toString() : '',
      'googleMapsURL': `https://www.google.com/maps/dir//${elem['lat']},${elem['lon']}`,
      'lat': elem['lat'],
      'lon': elem['lon'],
      'data': !getResp ? [] : getResp.rows.map(elem => {
        return {
          'name': elem['name'],
          'user_id': elem['user_id'],
          'review': elem['review'],
          'stars': elem['stars']
        }
      }),
      'averageStars': Math.round((getResp.rows.reduce((acc, curr) => {
        return acc + curr.stars;
      }, 0))/ getResp.rows.length),
      'numberOfReviews': getResp.rows.length
      }
    });
    res.locals.moreInfo = resultJSON;
    return next();
  } catch(err) {
    console.log(err);
    return next({log: 'error at getMoreInfo middleware', message: 'fetch request to trail info API failed'})
  }
}

module.exports = moreInfoController;