'use strict';

var request = require("request");
var config = require("dotenv").config();


export function handler(event, context, callback) {

  // select the form ID environment variable depending on what we requested
  var form_id = "form_id_" + event.queryStringParameters['form_name'];
  var FORM_ID = process.env[form_id] || config[form_id];

  console.log(form_id );

  var API_AUTH = process.env.form_api_access_token || config.form_api_access_token;

  // define the desired URL
  var url = "https://api.netlify.com/api/v1/forms/" + FORM_ID + "/submissions/?access_token=" + API_AUTH;
  console.log("Requesting", url);
  request(url, function(err, response, body){

    // format the response to be a bit mor concise and return it to the client
    if(!err && response.statusCode === 200){
      var results = [];
      var formsData = JSON.parse(body);
      for(var item in formsData) {
        var handle = formsData[item].data.twitter.replace("@", "");
        if(handle.length > 0) {
          console.log("Entry found: ", handle)
          results.push(handle);
        }
      }
      var data = {
        "handles" : [...new Set(results)]
      };
      return callback(null, {
        statusCode: 200,
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
      })
    } else {
      return callback(null, {
        statusCode: 200,
        body: err
      })
    }
  });
}
