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
<head>
<meta charset="UTF-8"/>
<meta content="always" name="referrer">
<title>Blog</title>
<link rel="stylesheet" href="./public/stylesheets/style.css">
</head>
<body>

<header>
    <h1>我的博客</h1>
</header>

<nav>
    <span><a title="主页" href="index.html">发表博客</a></span>
</nav>
<div>
    <span id="t3"></span>
    <span>
        <h3> <strong style="color: red" id="t1"></strong>${params.title}</h3>
    </span>
    <span>
         <strong style="color: darkgreen" id="t2">${params.text}</strong>
    </span>

</div>
<br>
<br>
<span>评论</span>
<hr>
<div>
    <div id="div1">
        
    </div>
    <br>
    <div id="div2">
        发表评论：<br>
        <input type="text" name="comment" id="comment"><br>
        <input type="button" value="评论" id="btnPost">
    </div>
</div>
<script src="./public/extern/jquery/jquery-1.11.1.min.js"></script>
<script>
    $(document).ready(function() {
        $('#btnPost').click(onClickPost);
    });

    function onClickPost() {
        var comment = $('#comment').val();
        var btn = $(this);
        $.ajax({
          type: "GET",
          url: "/.netlify/functions/look",
          data: {comment:comment},
          dataType: "json",
          success: function(data){
                      $('#comment').empty();
                      var html = ''; 
                      $.each(data, function(commentIndex, comment){
                            html += '<div><p"' + data.comment + '</p></div>';
                      });
                      $('#div1').html(html);
                   }
        })
    }

</script>
</body>
    
    `
    });
};
