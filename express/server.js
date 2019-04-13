import querystring from "querystring";
const express = require('express');
const serverless = require('serverless-http');
const fs = require('fs');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const router = express.Router();
router.post('/', (req, res) => {
    console.log(req);
    let title = req.body.title ? req.body.title : 'null';
    let text = req.body.text ? req.body.text : 'null';
    let json = {
      "title":title,
      "text":text
    }
    // fs.writeFile('../src/data.json',json,'utf-8',function(err,data){
    //   if(err){
    //     throw err;
    //   }
    // })
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(`
    <div>
    <span id="t3"></span>
    <span>
        <h3> <strong style="color: red" id="t1"></strong>${JSON.stringify(req.body)}</h3>
        <h3> <strong style="color: red" id="t1"></strong>${JSON.stringify(req)}</h3>
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
// module.exports.handler = serverless(app);

module.exports.handler = function(event, context, callback){
  const params = querystring.parse(event.body);
  callback(null, {
    headers: {
      "content-type": 'text/html'
    },
    statusCode: 200,
    body: `
    <div>
    <span id="t3"></span>
    <span>
        <h3> <strong style="color: red" id="t1"></strong>${params.title}</h3>
    </span>
    <span>
         <strong style="color: darkgreen" id="t2">${params.text}</strong>
    </span>

    </div>
    `
    });
};
