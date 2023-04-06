const express = require('express');
const path = require('path')

const app = express();

app.get('/api', (req, res) => {
  res.json({"users": ["user1", "user2", "user3"]})
});

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../dist/index.html'))
})

app.listen(4000, () => {console.log('server started on port 4000')});