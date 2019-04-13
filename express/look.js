module.exports.handler = function(event, context, callback){
  let query = event.queryStringParameters.comment || 'null';
  callback(null, {
    statusCode: 200,
    body: {data:query.comment}
  });
};

