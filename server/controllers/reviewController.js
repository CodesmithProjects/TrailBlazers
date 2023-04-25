const db = require('../models/bikeTrailsModels');
const S3 = require('aws-sdk/clients/s3');
const crypto = require('crypto')
const { promisify } = require('util')
const randomBytes = promisify(crypto.randomBytes)

const reviewController = {}

reviewController.createReview = async (req, res, next) => {
    try {
        const trailID = req.params.trailID;
        // const { name, review, stars } = req.body;
        const { user_id, review, stars, date } = req.body;
        const createSQL = `
        INSERT INTO reviews (trail_id, user_id, review, stars, date)
        VALUES ($1, $2, $3, $4, $5) RETURNING review_id
        `
        const params = [trailID, user_id, review, stars, date];
        const createReviewQuery = await db.query(createSQL, params);
        res.locals.reviewID = createReviewQuery.rows[0].review_id
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

reviewController.addPhotos = async (req, res, next) => {
    try {
        const trailID = req.params.trailID;
        const review_id = res.locals.reviewID
        const { user_id, photos } = req.body;
        const createSQL = `
        INSERT INTO photos (user_id, trail_id, review_id, photo_src)
        VALUES ($1, $2, $3, $4)
        `
        for (let i = 0; i < Object.entries(photos).length; i++) {
          const params = [user_id, trailID, review_id, photos[i].url];
          await db.query(createSQL, params);
        }
        return next();
    } catch {
        return next({log:'error at createReview middleware', message:'failed to create review'})
    }
}

reviewController.uploadURL = async (req, res, next) => {
  const bucketName = process.env.AWS_BUCKET_NAME;
  const region = process.env.AWS_BUCKET_REGION;
  const accessKeyId = process.env.AWS_BUCKET_ACCESS_KEY;
  const secretAccessKey = process.env.AWS_BUCKET_SECRET_KEY;

  const s3 = new S3({
    region,
    accessKeyId,
    secretAccessKey,
    signatureVersion: 'v4'
  }); 

  const rawBytes = await randomBytes(16)
  const imageName = rawBytes.toString('hex')
  const params = ({
    Bucket: bucketName,
    Key: imageName,
    Expires: 60
  })
  const uploadURL = await s3.getSignedUrlPromise('putObject', params)
  res.locals.uploadURL = uploadURL
  return next();
}

module.exports = reviewController