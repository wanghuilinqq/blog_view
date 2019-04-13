module.exports.handler = function(event, context, callback){
  let comment = event.queryStringParameters.comment || 'null';
  callback(null, {
    statusCode: 200,
    body: {data:comment}
  });
};

