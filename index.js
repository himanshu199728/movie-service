'use strict';
const express = require('express');
const app = express();
// Init configuration
require('dotenv').config();

const { defaultHandler, movieController } = require('./src/controller')

// Middleware to set parser
app.use(express.json());

app.get('/movies/:title', movieController.findByTitle);
app.get('/movies', movieController.find);
app.get('/', defaultHandler);
