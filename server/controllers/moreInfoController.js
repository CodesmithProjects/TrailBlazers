const moreInfoController = {};

moreInfoController.getMoreInfo = (req, res, next) => {
  try {
    const { id } = req.params.id;
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '4ac30dd25amsha3ddf95ba050838p145c07jsn8d93d2b2c1c0',
        'X-RapidAPI-Host': 'trailapi-trailapi.p.rapidapi.com'
      }
    };
    
    fetch(`https://trailapi-trailapi.p.rapidapi.com/trails/%7B${id}%7D`, options)
      .then(response => response.json())
      .then(response => res.locals.moreInfo = response)
    
    console.log(res.locals.moreInfo);
    return next();
  } catch(err) {
    console.log(err);
    return next({log: 'error at getTrails middleware', message: 'fetch request to trails API failed'})
  }
}

module.exports = moreInfoController;