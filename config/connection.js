const { connect, connection } = require('mongoose');

// connect to mongo
connect('mongodb://127.0.0.1:27017/socialNetworkDB');

module.exports = connection;
