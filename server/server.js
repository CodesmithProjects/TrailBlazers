const express = require('express');
const bikeTrailsRouter = require('./routers/bikeTrailsAPI');
const app = express();

app.use(express.json());
app.use('/api/trails', bikeTrailsRouter);

app.get('/api', (req, res) => {
  res.json({"users": ["user1", "user2", "user3"]})
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

app.listen(4000, () => {console.log('server started on port 4000')});