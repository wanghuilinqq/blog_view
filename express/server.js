'use strict';
const express = require('express');
const serverless = require('serverless-http');
const fs = require('fs');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const router = express.Router();
router.post('/', (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    let title = req.body.title;
    let text = req.body.text;
    let json = {
      "title":title,
      "text":text
    }
    fs.writeFile('../src/data.json',json,'utf-8',function(err,data){
      if(err){
        throw err;
      }
    })
    res.write(`
    <div>
    <span id="t3"></span>
    <span>
        <h3> <strong style="color: red" id="t1"></strong>${title}}</h3>
    </span>
    <span>
         <strong style="color: darkgreen" id="t2">${text}</strong>
    </span>

    </div>
    `);
    res.end();
});

app.use(bodyParser.json());
app.use('/.netlify/functions/server', router);  // path must route to lambda

module.exports = app;
module.exports.handler = serverless(app);
