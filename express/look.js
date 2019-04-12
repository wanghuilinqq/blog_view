'use strict';
const express = require('express');
const serverless = require('serverless-http');
const app = express();
const bodyParser = require('body-parser');

const router = express.Router();
router.post('/', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  let data = req.body;
  res.render('../look.html',data);
//   res.end();
});

app.use(bodyParser.json());
app.use('/.netlify/functions/look', router);

module.exports = app;
module.exports.handler = serverless(app);
