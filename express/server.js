import querystring from "querystring";
import {header,html_02,header} from "server-local";

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

