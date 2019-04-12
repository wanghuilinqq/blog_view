'use strict';
const express = require('express');
const serverless = require('serverless-http');
const app = express();
const bodyParser = require('body-parser');

const router = express.Router();
router.get('/', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write(`<head>
  <meta charset="UTF-8"/>
  <title>Blog</title>
  <link rel="stylesheet" href="../public/stylesheets/style.css">
  <meta http-equiv ="Content-Security-Policy" content="upgrade-insecure-requests">
</head>
<body>

<header>
  <h1>我的博客</h1>
</header>

<nav>
  <span><a title="主页" href="/">发表博客</a></span>
</nav>
<article>
  <form method="post" action="/">
      标题：<br/>
      <input type="text" name="title" id="title"/><br/>
      正文：<br/>
      <textarea name="text" rows="20" cols="100" id="text"></textarea><br/>
      <input type="button" value="发表" id="btnPost" />
  </form>
</article>
</body>`);
  res.end();
});


app.use(bodyParser.json());
app.use('/.netlify/functions/server', router);  // path must route to lambda

module.exports = app;
module.exports.handler = serverless(app);
