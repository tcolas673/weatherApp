const os = require('os');
const networkInterfaces = os.networkInterfaces();

function getIP(){
    return networkInterfaces.en0[1].address;
}

module.exports = {
    getIP: getIP
}