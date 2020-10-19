'use strict';
const mongoose = require('mongoose');

class MongoHelper {

    static connect(uri) {
        mongoose.connect(uri, {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(() => {
            console.log('Mongoose connected successfully ...');
        }).catch(() => {
            console.error('Mongoose connection to mongoDB failed. Make sure your mongoDB is running.')
        });
    }
}
module.exports = MongoHelper;