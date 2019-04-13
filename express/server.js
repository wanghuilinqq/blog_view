import querystring from "querystring";
module.exports.handler = (event, context, callback) => {
  let params = querystring.parse(event.body);
  if(params.title){
    let html_02 = `
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
                        "                <div id=\\"div_02\\"> </div>\\n"+
                        "                <div>\\n" +
                        "                    <form method=\\"post\\" action=\\"/.netlify/functions/server\\">\\n" +
                        "                        发表评论：<br>\\n" +
                        "                        <input type=\\"text\\" name=\\"comment\\" id=\\"comment\\"><br>\\n" +
                        "                        <input type=\\"submit\\" value=\\"评论\\" id=\\"btnPost\\">\\n" +
                        "                    </form>\\n" +
                        "                </div>";
                        $("#div_01").append(temp_html);
                                        });
                  </script>
                
        `;
    global.html = global.header+ html_02 +global.flooter;
  }else if(params.comment){
    let html_02 = `
                 <script>
                  $(document).ready(function(){
                       let temp_html ="<span><strong>${params.comment}</strong></span><br>";
                        $("#div_02").append(temp_html);
                  });
                    
                  </script>
                
        `;
    global.html = global.header+ html_02 +global.flooter;
  }
  let global_html = global.html;
  callback(null, {headers : {"content-type" : 'text/html'}, statusCode : 200, body : global_html});

};

