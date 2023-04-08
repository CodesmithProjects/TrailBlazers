const express = require('express');
const bikeTrailsRouter = require('./routers/bikeTrailsAPI');
const bikeTrailInfoRouter = require('./routers/bikeTrailInfoAPI');

const fs = require('fs');
const app = express();
const path = require('path');


// TODO: remove mock files and endpoints when UI hooks into real routers
const mockTrailsFilePath = path.join(__dirname, 'mock/mockTrails.json');
const mockTrailDetailsPath = path.join(__dirname, 'mock/mockTrailDetails.json');

app.get('/mockgetalltrails', (req, res) => {
  const readable = fs.createReadStream(mockTrailsFilePath);
  readable.pipe(res);
});

app.get('/mocktraildetails/:id', (req, res) => {
  const readable = fs.createReadStream(mockTrailDetailsPath);
  readable.pipe(res);
});


app.use(express.json());
app.use('/api/trails', bikeTrailsRouter);
app.use('/api/moreInfo', bikeTrailInfoRouter);


app.get('/api', (req, res) => {
  res.json({ "users": ["user1", "user2", "user3"] })
});

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