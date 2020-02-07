const express = require('express');
const app = express();
const port = 3000;

function handleListening() {
    console.log(`Listening on http://localhost:${port}`);
}

function handleHome(req, res) {
    console.log(req);
    res.send('Hello This is home!');
}

app.get('/', handleHome);


app.listen(port, handleListening);


