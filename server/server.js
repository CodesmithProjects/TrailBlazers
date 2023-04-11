const express = require('express');
require('dotenv').config({path: '../.env'})
const app = express();
const bikeTrailsRouter = require('./routers/bikeTrailsAPI');
const bikeTrailInfoRouter = require('./routers/bikeTrailInfoAPI');
const path = require('path');

app.use(express.json());
app.use('/api/trails', bikeTrailsRouter);
app.use('/api/moreInfo', bikeTrailInfoRouter);

app.get('/details/287733/0', (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../client/index.html'))
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