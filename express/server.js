'use strict';
const express = require('express');
const serverless = require('serverless-http');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const router = express.Router();
// app.use(express.static(path.join(__dirname,'/public')));
router.get('/', (req, res) => {
    res.render('look.html')
});

app.use(bodyParser.json());
app.use('/.netlify/functions/server', router);  // path must route to lambda

module.exports = app;
module.exports.handler = serverless(app);
