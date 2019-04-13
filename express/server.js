import querystring from "querystring";
const fs = require('fs');
module.exports.handler = function(event, context, callback) {
  let params = querystring.parse(event.body);
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
        <link rel="stylesheet" href="https://condescending-franklin-acde9d.netlify.com/public/stylesheets/style.css">
    </head>
    <body>
    
        <header> <h1>我的博客</h1> </header>
        
        <nav>
            <span><a title="主页" href="https://condescending-franklin-acde9d.netlify.com/index.html">发表博客</a></span>
        </nav>
        
        <div>
            <span id="t3"></span>
            <span>
                <h3> 标题-<strong style="color: red" id="t1"></strong>${params.title}</h3>
            </span>
            <span>
                 正文-<strong style="color: darkgreen" id="t2">${params.text}</strong>
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
            <div>
                发表评论：<br>
                <input type="text" name="comment" id="comment"><br>
                <input type="button" value="评论" id="btnPost">
            </div>
        </div>
            <script src="https://cdn.staticfile.org/jquery/1.10.2/jquery.min.js"></script>
       
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
                        var html = '<div><p"' + data.comment + '</p></div>';
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
