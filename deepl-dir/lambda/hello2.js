import * as index from './deepl-for-slack/src/index';

exports.handler = async function(event, context) {
    console.log("request:", JSON.stringify(event));
    const results = require('./deepl-for-slack/src/index').replies(context, event);
    return {
      statusCode: 200,
      headers: {},
      body: JSON.stringify(results)
    };
};
// End of lambda function
