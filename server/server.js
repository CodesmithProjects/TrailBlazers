const express = require('express');
const app = express();

const fs = require('fs');
const path = require('path');

const mockTrailsFilePath = path.join(__dirname, 'mock/mockTrails.json');

// app.get('/mockgetalltrails', (req, res) => {
//   const readable = fs.createReadStream(mockTrailsFilePath);
//   readable.pipe(res);
// });

app.get('/api', (req, res) => {
  res.json({"users": ["user1", "user2", "user3"]})
});

app.listen(4000, () => {console.log('server started on port 4000')});