'use strict';

var request = require("request");
var config = require("dotenv").config();
var FORM_ID = process.env.form_id_raffle_smashing_london_2018 || config.form_id_raffle_smashing_london_2018;
var API_AUTH = process.env.form_api_access_token || config.form_api_access_token;

export function handler(event, context, callback) {

  // define the desired URL
  var url = "https://api.netlify.com/api/v1/submissions/" + FORM_ID + "?access_token=" + API_AUTH;

  request(url, function(err, response, body){
    if(!err && response.statusCode === 200){
      console.log("...we got a result");
      return callback(null, {
        statusCode: 200,
        body: body
      })
    } else {
      return callback(null, {
        statusCode: 200,
        body: err
      })
    }
  });
}
