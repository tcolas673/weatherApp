const express = require('express');
const TempRouter = new express.Router();
const tempHandler = require('./tempHandler');
const { postcodeValidator } = require('postcode-validator');

// /weather/:zipcode

TempRouter.all('/:zipcode', (req, res) => {
if (req.method == 'GET') {
    const zipCode = req.params.zipcode;
    const isValid = postcodeValidator(zipCode, 'US');
    
    if(!isValid){
      const jsonResponse = { status: {
        code: 1004,
        title: 'Invalid Operation',
        message: 'Invalid zipcode',
      }};
      res.status(400);
    return res.json(jsonResponse);
    }

    const tempSetter = new tempHandler();
    tempSetter.getTemp(zipCode, (isSet, resp, temp) => {
        if (!isSet) {
            const jsonResponse = { status: {
                code: 1004,
                title: 'Something went wrong',
                message: resp.message,
              }};
            
            res.status(400);
            return res.json(jsonResponse);
          }
  
          const response = { status: {
            code: 200,
            title: 'Success',
            message: resp.message,
          }};;
          response.weather = temp;
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



