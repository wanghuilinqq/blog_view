
const header =  `<html>
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
const html_02 = ``;
const header = flooter = `
    </div>
    </body>
    </html>
`;

const app = require('./express');

app.listen(3000, () => console.log('Local app listening on port 3000!'));
