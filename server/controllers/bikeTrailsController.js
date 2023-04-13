const fetch = require('node-fetch');
const db = require('../models/bikeTrailsModels');

const bikeController = {};

bikeController.getTrails = async (req, res, next) => {
    try {
        const url = `https://trailapi-trailapi.p.rapidapi.com/trails/explore/?lat=${res.locals.lat}&lon=${res.locals.lon}&per_page=9&radius=25`;
        const options = {
            method: 'GET',
            headers: {
              'X-RapidAPI-Key': '4ac30dd25amsha3ddf95ba050838p145c07jsn8d93d2b2c1c0',
              'X-RapidAPI-Host': 'trailapi-trailapi.p.rapidapi.com'
            }
          };
        const trailsAPIResponse = await fetch(url, options);
        const trailsAPIResponseJSON = await trailsAPIResponse.json();
        delete trailsAPIResponseJSON['results'];
        trailsAPIResponseJSON['data'] = trailsAPIResponseJSON['data'].map(elem => {
          return {
            'id' : elem['id'],
            'name' : elem['name'],
            'length': elem['length'],
            'description': ((elem['description']).toString()).replace(/<\/?[^>]+(>|$)/g, "").replace(/\n/g, '').replace(/\r/g, ''),
            'difficulty': elem['difficulty'],
          }
        });
        res.locals.trails = trailsAPIResponseJSON;
        return next();
    } catch {
        return next({log: 'error at bikeController.getTrails middleware', message: 'fetch request to moreInfo trails API failed'})
    }
}

bikeController.getFavTrails = async (req, res, next) => {
  try {
    const user_id = req.cookies.userID;

    const getTrailsSQL = `
    SELECT * FROM favorite_trails
    WHERE user_id = ${user_id};`;

    await db.query(getTrailsSQL).then((data) => {
      const trailsForQuery = [];
      for (let i = 0; i < data.rows.length; i++) {
        const trail = data.rows[i];

        trailsForQuery.push({ trailId: trail['trail_api'], trailName: trail['trail_name']});
        // console.log(trailsForQuery);
      }
      res.locals.data = trailsForQuery;
      // console.log(`THIS IS THE DATA: `, res.locals.data);
      return next();
    })
  } catch(err) {
    next({log: 'error at bikeTrailsController.getFavTrails', message: `failed to get favorite trails, ${err}`});
  }


}

bikeController.saveTrails = async (req, res, next) => {
  try {
    const user_id = Number(req.cookies.userID);
    
    const { trailId, trailName } = req.body;

    const saveTrailsSQL = `
    INSERT INTO favorite_trails(user_id, trail_api, trail_name)
    VALUES(${user_id}, '${trailId}', '${trailName}');`;

    const checkTrailsSQL = `
    SELECT * FROM favorite_trails
    WHERE user_id = ${user_id} AND trail_api = '${trailId}';`;
    
    // query first to db to check if trail is already favorited to prevent duplicates then save trail
    await db.query(checkTrailsSQL)
      .then(async (data) => {
        if (!data.rows.length) {
          await db.query(saveTrailsSQL)
            .then(data => {
              // console.log(`THIS IS THE DATA `, data);
              res.locals.isSaved = true;
              return next();
            })
        } else {
          throw new Error(`This trail is already favorited!`);
        }
      });
  } catch(err) {
    res.locals.isSaved = false;
    next({log: 'error at bikeTrailsController.saveTrails', message: `failed to save favorite trails to database. ${err}`});
  }

}

bikeController.deleteTrails = async (req, res, next) => {
  try {
    const user_id = req.cookies.userID;

    const { trailId } = req.params;

    const deleteTrailsSQL = `
    DELETE FROM favorite_trails
    WHERE user_id = ${user_id} AND trail_api = '${trailId}';`

    await db.query(deleteTrailsSQL).then((data) => {
      res.locals.isDeleted = true;
      return next();
    })
  } catch(err) {
    res.locals.isDeleted = false;
    next({log: 'error at bikeTrailsController.deleteTrails', message: `failed to delete favorite trail from database`});
  }
}

module.exports = bikeController;