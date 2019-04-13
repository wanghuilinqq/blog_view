import querystring from "querystring";
module.exports.handler = function(event, context, callback){
  let params = querystring.parse(event.body);
  callback(null, {
    statusCode: 200,
    body: {data:params.comment}
  });
};

