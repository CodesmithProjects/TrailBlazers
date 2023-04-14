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
    WHERE google_id = '${user_id}';`;

    let dbRes = await db.query(getTrailsSQL);
    const trailsForQuery = [];
    for (let i = 0; i < dbRes.rows.length; i++) {
      const trail = dbRes.rows[i];

      trailsForQuery.push({ trailId: trail['trail_id'], trailName: trail['trail_name']});
    }

    res.locals.data = {data: trailsForQuery};
    return next();
  } catch(err) {
    next({log: 'error at bikeTrailsController.getFavTrails', message: `failed to get favorite trails, ${err}`});
  }


}

bikeController.saveTrails = async (req, res, next) => {
  try {
    const google_id = req.cookies.userID;
    const { id } = req.body;
    const checkTrailsSQL = `
    SELECT * FROM favorite_trails
    WHERE google_id = '${google_id}' AND trail_id = '${id}';`;
    // query first to db to check if trail is already favorited to prevent duplicates then save trail
    let alreadyFavorited = await db.query(checkTrailsSQL)
    alreadyFavorited = await alreadyFavorited.json();
    res.locals.isSaved = true;
    return next();
  } catch(err) {
    const google_id = req.cookies.userID;
    const { id, name } = req.body;
    const saveTrailsSQL = `
    INSERT INTO favorite_trails(google_id, trail_id, trail_name)
    VALUES('${google_id}', '${id}', '${name}');`;
    const saveQuery = await db.query(saveTrailsSQL);
    res.locals.isSaved = true;
    next();
  }

}

bikeController.deleteTrails = async (req, res, next) => {
  try {
    const user_id = req.cookies.userID;
    const { trailId } = req.params;
    const deleteTrailsSQL = `
    DELETE FROM favorite_trails
    WHERE google_id ='${user_id}' AND trail_id = '${trailId}';`
    await db.query(deleteTrailsSQL)
    res.locals.isDeleted = true;
    return next();
  } catch(err) {
    res.locals.isDeleted = false;
    next({log: 'error at bikeTrailsController.deleteTrails', message: `failed to delete favorite trail from database`});
  }
}

module.exports = bikeController;