import querystring from "querystring";

let fs = require('fs');
module.exports.handler = async(event, context) => {
  let params = querystring.parse(event.body);
  fs.readFile('../src/data.json', 'utf8').then(data => {
    let person = data.toString();
    person = JSON.parse(person);
    let temp_param = {
      "id" : person.data.length + 1,
      "title" : params.title,
      "text" : params.text
    };
    person.data.push(temp_param);
    person.total = person.data.length;
    let str = JSON.stringify(person);
    fs.writeFile('../src/data.json', str);
  }).then(data => ({
    headers : {"content-type" : 'text/html'},
    statusCode : 200,
    body : `<html>
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
                    <div id="div2">
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
                        $.ajax({
                          type: "POST",
                          url: "/.netlify/functions/look",
                          dataType: "json",
                          data: {comment:comment},
                          success: function(data){
                                alert(JSON.stringify(data));
                                $('#comment').empty();
                                var html = '<p"' + data.comment + '</p> <br>';
                                $('#div1').html(html);
                          }
                        })
                    }
                
                </script>
            </body>
        </html>`
  })).catch(error => ({statusCode : 404, body : String(error)}));
};

