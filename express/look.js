import querystring from "querystring";

module.exports.handler = function(event, context, callback) {
  const params = querystring.parse(event.body);
  fs.readFile('../src/data.json', 'utf8', function(err, data) {
    if(err) {
      callback({headers : {"content-type" : 'text/html'}, statusCode : 1001, body : String(err)});
    }
    let person = data.toString();
    person = JSON.parse(person);
    person.data.map(item => {
      if(item.title == params.title) {
        item.comment.push(params.comment);
      }
    });
    let str = JSON.stringify(person);
    fs.writeFile('../src/data.json', str, function(err, ret) {
      if(err) {
        callback({headers : {"content-type" : 'text/html'}, statusCode : 1001, body : String(err)});
      }
      callback(null, {headers : {"content-type" : 'text/html'}, statusCode : 200, body : '评论成功'});
    });
  });

};

