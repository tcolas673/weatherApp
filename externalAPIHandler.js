const request = require('request');

class ExternalAPIHandler {
  getExternalApi(externalURL, callback) {
    const responseFormat = 'json';
    const self = this;
    request(externalURL, (err, res, body) => {
      if (err) {
        console.log('Error: '+ err.message);
        return callback(err, null);
      }
      const out = typeof(body) != 'object'? self.parseReponse(body, responseFormat): body;
      return callback(null, out);
    });
  }

  parseReponse(body, format) {
    let out = null;
    format = format || 'json';

    switch (format) {
      case 'json':
        out = JSON.parse(body);
        break;

      case 'xml':
        if ( xmlParser.validate(body) === true) { // optional (it'll return an object in case it's not valid)
          out = xmlParser.parse(body);
        } else {
          console.error('Invalid XML: ' + body);
        }
        break;
    }

    return out;
  }
}

module.exports = ExternalAPIHandler;

