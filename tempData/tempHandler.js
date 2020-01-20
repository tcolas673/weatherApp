const config = require('./config.json');
const ExternalAPIHandler = require('../externalAPIHandler');
const parser = require('./tempParser');
const util = require('util');
require('dotenv').config();

class tempHandler {
    getTemp(zipCode, callback){
        const APIHandler = new ExternalAPIHandler();
        const url = util.format(config.weather.url, zipCode, process.env.API_KEY);
        APIHandler.getExternalApi(url, function(err, resp) {
            if (err) {
              const error = new Error('Failed to fetch data from open weather API');
              callback(false, error);
            }
            if (!resp) {
              const error = new Error('Something went wrong! Failed to fetch data from open weather API');
              callback(false, error);
              return;
            }
            if (resp.length < 1) {
              const success = {statusCode: 200, message: 'No weather reports listed for this area'};
              callback(true, success, null);
              return;
            } else { 
                if(resp.cod ==200){
                    resp = parser.refine(resp);
                }
              
              const success = {statusCode: 200, message: 'Temperature listed'};
              callback(true, success, resp);
              return;
            }

        });
    }
}

module.exports=tempHandler;