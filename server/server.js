const express = require('express');
const app = express();
const bikeTrailsRouter = require('./routers/bikeTrailsAPI');
const bikeTrailInfoRouter = require('./routers/bikeTrailInfoAPI');
const { Pool, Client } = require('pg');

const client = new Client({
  connectionString: 'postgres://wtgwtfld:KfGVL8wRpAn_h6QA2RwHyvIEF5VhAibG@heffalump.db.elephantsql.com/wtgwtfld'
});

client.connect(function(err) {
  if (err) throw err;
  console.log("Connected to database!");
});

app.use(express.json());
app.use('/api/trails', bikeTrailsRouter);
app.use('/api/moreInfo', bikeTrailInfoRouter);

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