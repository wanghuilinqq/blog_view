import querystring from "querystring";

let header = `<html>
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
              <div id = "div_01">
                
</div>

`;

let flooter = `
    </body>
    </html>
`;
module.exports.handler = (event, context, callback) => {
  let params = querystring.parse(event.body);
  let html_2 = `
      <script src="https://cdn.staticfile.org/jquery/1.10.2/jquery.min.js"></script>
       <script>
        $(document).ready(function(){
           var div =  document.getElementById("div_01");
           var insertHtml = '';
           insertHtml += '<div><span><h3> 标题-<strong style="color: red"></strong>'+${params.title}+'</h3></span>';
           insertHtml += '<span>正文-<strong style="color: darkgreen" id="t2">'+${params.text}+'</strong></span> <br>';
           innerHTML +=' <span>评论</span><hr><div><form>发表评论：<br><input type="text" name="comment" id="comment"><br> <input type="submit" value="评论" id="btnPost"></form></div>';
           document.getElementById("insert").innerHTML = insertHtml;
        });
      </script> 
        `;
  let html = header + html_2 + flooter;
  callback(null, {headers : {"content-type" : 'text/html'}, statusCode : 1001, body : html});

};

