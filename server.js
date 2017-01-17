const express = require('express');
const app = require('express')();
const http = require('http').Server(app);

app.get('/', (req, res) => {
    res.send('Hi');
});

http.listen(3000, () => {
    console.log('listening...');
});