// importing my http library to create server for communication
const http = require('http');
const express = require('express');
// setting up my port that app will run on
require('dotenv').config();
const PORT = process.env.PORT;

// Setup a handler or a file that will hold my handlers
const TempRouter = require('./tempData/tempRouter');

//?
const app = express();

// attach handler to endpoint
app.use('/weather', TempRouter);

const server = http.createServer(app);

server.listen(PORT, () => {
    // db.connect();
    console.log('Server is running on PORT:', PORT);
  });