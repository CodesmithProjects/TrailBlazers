const db = require('../models/bikeTrailsModels');

const reviewController = {}

reviewController.createReview = async (req, res, next) => {
    try {
        const trailID = req.params.trailID;
        // const { name, review, stars } = req.body;
        const { user_id, review, stars } = req.body;
        const createSQL = `
        INSERT INTO reviews (trail_id, user_id, review, stars)
        VALUES ('${trailID}', '${user_id}', '${review}', ${stars})
        `
        await db.query(createSQL);
        res.locals.saved = true;
        return next();
    } catch {
        return next({log:'error at createReview middleware', message:'failed to create review'})
    }
    
}

module.exports = reviewController