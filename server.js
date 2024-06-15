// app.js
const express = require('express');
const app = express();
require('dotenv').config();
app.use(express.static(path.join(__dirname, 'public')));
// Middleware
app.use(express.json());


// Get a book by ID
app.get('/', (req, res) => {
    res.send("hello")
});

app.post('/books/:id', (req, res) => {
    res.send("hello")
});