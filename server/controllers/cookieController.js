const fetch = require('node-fetch')
const db = require('../models/bikeTrailsModels');
const cookieController = {};

cookieController.createCookie = async (req, res, next) => {
    try {
        if (!req.query.access_token) {
            console.log('no access token');
            return res.redirect('http://localhost:5173')
        }
        let token = `access_token=${req.query.access_token}&token_type=Bearer&expires_in=3599
        &scope=email%20profile%20https://www.googleapis.com/auth/userinfo.email%20https://www.googleapis.com/auth/userinfo.profile%20openid
        &authuser=0&prompt=consent`;
        const googleAPIURI = 'https://www.googleapis.com/oauth2/v1/userinfo?'
        let userInfo = await fetch(`${googleAPIURI}${token}`);
        userInfo = await userInfo.json();
        res.cookie('userID', userInfo.id, {maxAge: 900000, httpOnly: false, sameSite: 'none', secure: true});
        res.locals.userID = userInfo.id;
        return next();
    } catch {
        return next({log: 'error at createCookie middleware', message: 'failed to set cookie'})
    }
};

cookieController.checkCookie = (req, res, next) => {
    if (!req.cookies.userID) {
        return res.redirect('http:localhost:5173');
    }
    return next();
}

module.exports = cookieController;