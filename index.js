const express = require('express');
const { uploadCSV } = require('./controllers/uploadController');
const { port } = require('./config/env');

const app = express();

app.get('/upload', uploadCSV);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
