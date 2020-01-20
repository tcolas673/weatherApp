
function refine(resp){
    const celsius = resp.main.temp-273.15;
    const fahren = Math.round((resp.main.temp-273.15)*1.8+32);
    const newObj = {
        temp_kelvin: resp.main.temp,
        temp_fahrenheit: fahren, 
        temp_celsius: parseFloat(celsius.toFixed(2)),
        city: resp.name,
    }
    return newObj;
}


module.exports = {
    refine: refine
}