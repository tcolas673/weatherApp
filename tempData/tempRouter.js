const express = require('express');
const TempRouter = new express.Router();
const tempHandler = require('./tempHandler');

// :ip/weather/:zipcode

TempRouter.all('/temp', (req, res) => {
if(req.method == 'GET'){
    const zipCode = req.params.zipcode;
    const contryCode = 'us';
    const tempSetter = new tempHandler();
    tempSetter.getTemp(zipCode, contryCode, (isSet, temp) => {
        if (!isSet) {
            const jsonResponse = { status: {
                code: 1004,
                title: 'Something went wrong',
                message: 'Invalid HTTP Request',
              }};
            
            res.status(400);
            return res.json(jsonResponse);
          }
  
          const response = methods.validQueryResponse(message, isSent);
          response.user = undefined;
          response.isCodeSent = isSent;
          return res.json(response);

    });
} else {
    const jsonResponse = { status: {
        code: 1004,
        title: 'Invalid Operation',
        message: 'Invalid HTTP Request',
      }};
    res.status(500);
    return res.json(jsonResponse);
}
})



module.exports = TempRouter;



