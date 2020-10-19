'use strict';
const express = require('express');
const app = express();

const { defaultHandler, movieController } = require('./src/controller');
const MongoHelper = require('./mongo-helper');

// Config, model intialisation
require('dotenv').config();
MongoHelper.connect(process.env.MONGO_URI);

// Middleware to set parser
app.use(express.json());

// Find by title
app.get('/movies/:title', movieController.findByTitle);
// Find by filter
app.post('/movies', movieController.find);
// Update rating and genres
app.put('/movies/:id', movieController.updateOne);

app.get('/', defaultHandler);

if (process.env.APP_ENV == 'local') {
    const PORT = process.env.PORT || 3600;
    app.listen(PORT, () => {
        console.log(`Server running at ${PORT}`);
    });
}
