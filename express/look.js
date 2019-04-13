import querystring from "querystring";

module.exports.handler = function(event, context, callback){
  const params = querystring.parse(event.body);
  callback(null, {
    headers: {
      "content-type": 'text/html'
    },
    statusCode: 200,
    body: {data:params.comment}
    });
};

