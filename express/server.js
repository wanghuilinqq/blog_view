import querystring from "querystring";
import style from "../public/stylesheets/style.css";
import jquery from "../public/extern/jquery/jquery-1.11.1.min.js";

const fs = require('fs');
module.exports.handler = function(event, context, callback) {
  const params = querystring.parse(event.body);
  callback(null, {
    headers : {
      "content-type" : 'text/html'
    },
    statusCode : 200,
    body : `
<html>
    <head>
        <meta charset="UTF-8"/>
        <title>Blog</title>
        <meta http-equiv ="Content-Security-Policy" content="upgrade-insecure-requests">
        <style type="text/css"> ${style} </style>
    </head>
    <body>
    
        <header> <h1>我的博客</h1> </header>
        
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
        <hr>
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
        <script>${jquery}</script>
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
</html>
    `
  });
};
