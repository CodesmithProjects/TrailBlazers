const db = require('../models/bikeTrailsModels');

const accountController = {};

accountController.createAccount = async (req, res, next) => {
    try {
        const {email, username} = res.locals.userInfo;
        const params = [email, username];
        console.log('Hit here')
        const findQueryString = `SELECT * FROM accounts WHERE email = $1`;
        const tryToFindUser = await db.query(findQueryString, params);
        // if user doesn't exist in the table...
        if (tryToFindUser.rows.length === 0) {
            const createQueryString = `INSERT INTO accounts (email, name) VALUES ($1, $2)`;
            const createRes = await db.query(createQueryString, params);
        }
        return next()
    } catch {
        return next({log:'problem at createAccount middleware', message: 'problem creating account in database'})
    }
}

module.exports = accountController;