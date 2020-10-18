'use strict';
const express = require('express');
const app = express();

// Middleware to set parser
app.use(express.json());

app.get('/movies', ()=> true);

app.get('/')

