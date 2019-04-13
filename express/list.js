import querystring from "querystring";

let fs = require('fs');
module.exports.handler = function(event, context, callback) {
  const params = querystring.parse(event.body);
  fs.readFile('../src/data.json', function(err, data) {
    if(err) {
      throw err;
    }
    let person = data.toString();
    person = JSON.parse(person);
    let rets = person.data;
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

            </body>
        </html>
`
    });
  })

};


