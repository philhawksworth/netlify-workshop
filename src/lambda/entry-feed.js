'use strict';

var request = require("request");
var config = require("dotenv").config();
var FORM_ID = process.env.form_id_raffle_smashing_london_2018 || config.form_id_raffle_smashing_london_2018;
var API_AUTH = process.env.form_api_access_token || config.form_api_access_token;

export function handler(event, context, callback) {

  // define the desired URL
  var url = "https://api.netlify.com/api/v1/forms/" + FORM_ID + "/submissions/?access_token=" + API_AUTH;
  console.log("Requesting", url);

  request(url, function(err, response, body){

    // format the response to be a bit mor concise and return it to the client
    if(!err && response.statusCode === 200){
      var results = [];
      var formsData = JSON.parse(body);
      for(var item in formsData) {
        results.push(formsData[item].data.twitter.replace("@", ""));
      }
      var j = [...new Set(results)]
      var data = {
        "handles" : j
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
