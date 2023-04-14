const db = require('../models/bikeTrailsModels');
const sessionController = {};

sessionController.createSession = async (req, res, next) => {
    try {
        const findQueryString = `SELECT * FROM sessions WHERE google_id = '${res.locals.userID}' AND created_at >= (now() - interval '15 minutes')`;
        const tryToFindSession = await db.query(findQueryString);
        if (!tryToFindSession.rows[0]) {
            const createQueryString = `INSERT INTO sessions (google_id) VALUES ('${res.locals.userID}')`;
            const createRes = await db.query(createQueryString)
        }
        return next();
    } catch {
        return next({log:'problem at createSession middleware', message: 'problem creating session in database'});
    }
}

sessionController.checkSession = async (req, res, next) => {
    try {
        const userID = req.cookies.userID;
        const findQueryString = `SELECT * FROM sessions WHERE google_id = '${userID}' AND created_at >= (now() - interval '15 minutes')`;
        const tryToFindSession = await db.query(findQueryString);
        if (!tryToFindSession.rows[0]) {
            return res.redirect('http://localhost:5173');
        }
        return next();
    } catch {
        return next({log:'problem at checkSession middleware', message: 'problem finding session in database'})
    }
}

module.exports = sessionController;