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
             
`;
let html_02 = ``;

let flooter = `
    </div>
    </body>
    </html>
`;
let id = 1;
module.exports.handler = (event, context, callback) => {
  let params = querystring.parse(event.body);
  let html = ``;
  if(params.title) {
    html_02 += `
                       <div>
                              <span>
                                  <h3> 标题-<strong style="color: red"></strong>${params.title}</h3>
                              </span>
                              <span>
                                   正文-<strong style="color: darkgreen">${params.text}</strong>
                              </span>
                          </div>
                        
                          <br>
                          <span>评论</span>
                          <hr>
                          <div id="div_${id}"> </div>
                          <div>
                            <form method="post" action="/.netlify/functions/server">
                                发表评论：<br>
                                <input type="hidden" id="${id}"></input>
                                <input type="text" name="comment" id="comment"><br>
                               <input type="submit" value="评论" id="btnPost">
                            </form>
                            </div>
                       </div>
        `;
    id += 1;
    html = header + html_02 + flooter;


  } else if(params.comment) {
    let query_str = "div_"+params.id;
    let query_length = query_str.length;
    let index_str = html_02.indexOf(query_str);
    let html_03 = `<span><strong>${params.comment}</strong></span><br>`;
    // let html_03_length = html_03.length;
    html_02 = html_02.slice(0,index_str+query_length)+html_03+html_02.slice(index_str+query_length);

    html = header + html_02+ flooter;


    
  } else if(params.myBlog) {
    html = header + html_02 + flooter;
  }



  callback(null, {headers : {"content-type" : 'text/html'}, statusCode : 200, body : html});

};

