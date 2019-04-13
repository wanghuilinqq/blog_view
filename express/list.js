import querystring from "querystring";

let fs = require('fs');
module.exports.handler = async function(event, context) {
  const params = querystring.parse(event.body);
  new Promise(() => {
    fs.readFile('../src/data.json')
  }).then(data => {
    let person = data.toString();
    person = JSON.parse(person);
    let rets = person.data;
    return {
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
    };
  }).catch(err => err);

};


