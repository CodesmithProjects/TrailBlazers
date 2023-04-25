const db = require('../models/bikeTrailsModels');

const reviewController = {}

reviewController.createReview = async (req, res, next) => {
    try {
        const trailID = req.params.trailID;
        // const { name, review, stars } = req.body;
        const { user_id, review, stars, date } = req.body;
        const createSQL = `
        INSERT INTO reviews (trail_id, user_id, review, stars, date)
        VALUES ($1, $2, $3, $4, $5)
        `
        const params = [trailID, user_id, review, stars, date];
        await db.query(createSQL, params);
        res.locals.saved = true;
        return next();
    } catch {
        return next({log:'error at createReview middleware', message:'failed to create review'})
    }
    
}

reviewController.deleteReview = async (req, res, next) => {
    try {
        const reviewID = req.params.trail_reviewID;
        const createSQL = `
        DELETE FROM reviews WHERE review_id=$1
        `
        const params = [reviewID];
        await db.query(createSQL, params);
        res.locals.saved = true;
        return next();
    } catch {
        return next({log:'error at deleteReview middleware', message:'failed to delete review'})
    }
}

reviewController.getReview = async (req, res, next) => {
    try {
        const reviewID = req.params.trail_reviewID;
        const createSQL = `
        SELECT * FROM reviews WHERE review_id=$1
        `
        const params = [reviewID];
        result = await db.query(createSQL, params);
        res.locals.review_data = result.rows[0];
        return next();
    } catch {
        return next({log:'error at getReview middleware', message:'failed to delete review'})
    }
}

reviewController.updateReview = async (req, res, next) => {
    try {
        const reviewID = req.params.trail_reviewID;
        const { stars, review, date } = req.body;
        const createSQL = `
        UPDATE reviews SET review = $3, stars = $2, date = $4 WHERE review_id = $1
        `
        const params = [reviewID, stars, review, date];
        await db.query(createSQL, params);
        res.locals.saved = true;
        return next();
    } catch {
        return next({log:'error at updateReview middleware', message:'failed to update review'})
    }
}

module.exports = reviewController