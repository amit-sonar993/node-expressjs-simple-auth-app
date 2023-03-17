const dotenv = require('dotenv');
dotenv.config();

const dbConfig = require('./db')

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}


module.exports = {
    env: process.env.APP_ENV,
    endpoint: process.env.API_URL,
    masterKey: process.env.API_KEY,
    port: normalizePort(process.env.PORT || '3000'),
    dbConfig: dbConfig
};