const fetch = require('node-fetch')
const cookieController = {};

cookieController.createCookie = async (req, res, next) => {
    try {
        const token = req.params.id;
        const googleAPIURI = 'https://www.googleapis.com/oauth2/v1/userinfo?'
        const userInfo = await fetch(`${googleAPIURI}${token}`)
        console.log(userInfo);
        // res.cookie('');
        return next();
    } catch {
        return next({log: 'error at createCookie middleware', message: 'failed to create cookie'})
    }
};

module.exports = cookieController;