const db = require('../models/bikeTrailsModels');

const accountController = {};

accountController.createAccount = async (req, res, next) => {
    try {
        const userID = req.cookies.userID
        try {
            const findQueryString = `SELECT * FROM accounts WHERE email = '${userID}'`
            const tryToFindUser = await db.query(findQueryString)
        } catch {
            const createQueryString = `INSERT INTO accounts (email) VALUES ('${userID}')`
            const createRes = await db.query(createQueryString)
        }
        return next()
    } catch {
        return next({log:'problem at createAccount middleware', message: 'problem creating account in database'})
        // return next();
    }
}

module.exports = accountController;