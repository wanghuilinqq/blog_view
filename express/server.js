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
                <div id = "div_01"></div>

`;

let flooter = `
    </body>
    </html>
`;
module.exports.handler = (event, context, callback) => {

  let params = querystring.parse(event.body);
  let html_02 = `
                <script src="https://cdn.staticfile.org/jquery/1.10.2/jquery.min.js"></script>
                 <script>
                  $(document).ready(function(){
                       let temp_html ="<div>\\n" +
                        "                    <span>\\n" +
                        "                        <h3> 标题-<strong style=\\"color: red\\" id=\\"t1\\"></strong>${params.title}</h3>\\n" +
                        "                    </span>\\n" +
                        "                    <span>\\n" +
                        "                         正文-<strong style=\\"color: darkgreen\\" id=\\"t2\\">${params.text}</strong>\\n" +
                        "                    </span>\\n" +
                        "                </div>\\n" +
                        "                \\n" +
                        "                <br>\\n" +
                        "                <span>评论</span>\\n" +
                        "                <hr>\\n" +
                        "                <div>\\n" +
                        "                    <form method=\\"post\\" action=\\"/.netlify/functions/look\\">\\n" +
                        "                        发表评论：<br>\\n" +
                        "                        <input type=\\"text\\" name=\\"comment\\" id=\\"comment\\"><br>\\n" +
                        "                        <input type=\\"submit\\" value=\\"评论\\" id=\\"btnPost\\">\\n" +
                        "                    </form>\\n" +
                        "                </div>";
                        $("#div_01").append(temp_html);
                                        });
                    
                  </script>
                
        `;
  let html = header+ html_02 +flooter;
  callback(null, {headers : {"content-type" : 'text/html'}, statusCode : 200, body : html});

};

