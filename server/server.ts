const express = require('express');
require('dotenv').config({path: '../.env'})
const cookieParser = require('cookie-parser')
const cors = require('cors')
const app = express();
const bikeTrailsRouter = require('./routers/bikeTrailsAPI');
const bikeTrailInfoRouter = require('./routers/bikeTrailInfoAPI');
const sessionRouter = require('./routers/sessionRouter')
const dbRouter = require('./routers/dbAPI');

app.use(express.json());
app.use(cookieParser());
app.use('/api/trails', bikeTrailsRouter);
app.use('/api/moreInfo', bikeTrailInfoRouter);
app.use('/api/sessions', sessionRouter);
const corsOptions = {
  credentials: true,
  origin: 'http://localhost:5173'
};
app.use(cors(corsOptions))
app.use('/api/db', dbRouter);

// NEEDED FOR UI MOCK - REMOVE LATER
const fs = require('fs');
const path = require('path');
const mockTrailsFilePath = path.join(__dirname, 'mock/mockFavoriteTrails.json');

// MOCK ENDPOINT FOR UI DEVELOPMENT - REMOVE LATER
app.post('/saveFavoriteTrail', (req, res) => {
  res.sendStatus(200);
}); 
// MOCK ENDPOINT FOR UI DEVELOPMENT - REMOVE LATER
app.get('/getAllFavoriteTrails', (req, res) => {
  const readable = fs.createReadStream(mockTrailsFilePath);
  readable.pipe(res);
});

app.get('/googlecallback/', (req, res) => {
  return res.redirect('http://localhost:5173');
})

app.use('*', (req, res) => {
  return res.redirect('http://localhost:5173');
})

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };

  const errorObj = Object.assign(defaultErr, err);
  console.log(errorObj);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(4000, () => { console.log('server started on port 4000') });