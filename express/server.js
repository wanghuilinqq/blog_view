'use strict';
const express = require('express');
const serverless = require('serverless-http');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const router = express.Router();
router.post('/', (req, res) => {
    // res.writeHead(200, { 'Content-Type': 'text/html' });
    res.send(req.body);
});

app.use(bodyParser.json());
app.use('/.netlify/functions/server', router);  // path must route to lambda

module.exports = app;
module.exports.handler = serverless(app);
