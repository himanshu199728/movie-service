'use strict';
const express = require('express');
const app = express();
// Init configuration
require('dotenv').config();

const { defaultHandler, movieController } = require('./src/controller')

// Middleware to set parser
app.use(express.json());

app.get('/movies/:title', movieController.findByTitle);
app.post('/movies', movieController.find);
app.put('/movies/:id', movieController.updateOne);
app.get('/', defaultHandler);

const PORT = process.env.PORT || 3600;
app.listen(PORT, () => {
    console.log(`Server running at ${PORT}`);
})
