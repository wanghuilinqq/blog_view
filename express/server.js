import querystring from "querystring";
let header =  `<html>
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
             
`;
let html_02 = ``;

let header = flooter = `
    </div>
    </body>
    </html>
`;
module.exports.handler = (event, context, callback) => {
  let params = querystring.parse(event.body);
  let html =``;
  if(params.title){
    html_02 += `
                       <div>
                              <span>
                                  <h3> 标题-<strong style="color: red" id="t1"></strong>${params.title}</h3>
                              </span>
                              <span>
                                   正文-<strong style="color: darkgreen" id="t2">${params.text}</strong>
                              </span>
                          </div>
                        
                          <br>
                          <span>评论</span>
                          <hr>
                          <div id="div_02"> </div>
                          <div>
                            <form method="post" action="/.netlify/functions/server">
                                发表评论：<br>
                                <input type="text" name="comment" id="comment"><br>
                               <input type="submit" value="评论" id="btnPost">
                            </form>
                            </div>
                       </div>
        `;
     html = header+ html_02 +flooter;
  }else if(params.comment){
    let html_02 = `<span><strong>${params.comment}</strong></span><br>`;
     html = header+ html_02 +flooter;
  }
  callback(null, {headers : {"content-type" : 'text/html'}, statusCode : 200, body : html});

};

