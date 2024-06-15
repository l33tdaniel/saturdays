// app.js
const express = require('express');
const app = express();
const path = require('path');
const writeToDB = require('./bin/db').writeToDB;
const readFromDB = require('./bin/db').readFromDB
const readAllFromDB = require('./bin/db').readAllFromDB
require('dotenv').config();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'ejs');

// Set up a route to render an EJS template
app.get('/', async (req, res) => {
    let result = await readAllFromDB()
    res.render('read', { results: result });
});

app.delete('/', (req, res) => {
    console.log(req.body.name)
});

app.post('/', (req, res) => {
    console.log(
        req.body.name,
        req.body.password
    )
})

app.listen(3000);