const express = require('express');
const cors = require('cors');
const sessionController = require('../controllers/sessionController');
const cookieController = require('../controllers/cookieController');
const sessionRouter = express.Router();

// const corsOptions = {
//     origin: ['http://localhost:5173', 'localhost:5173', 'http://127.0.0.1:5173'],
//     methods: ['GET', 'PUT', 'POST', 'DELETE'],
//     credentials: true,
//     optionsSuccessStatus: 200
// }
sessionRouter.get('/:token', 
// cors(corsOptions), 
cookieController.createCookie, (req, res) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173')
  return res.status(200);
})

module.exports = sessionRouter;