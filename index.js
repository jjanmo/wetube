const express = require('express');
const app = express();
const port = 3000;

function handleListening() {
    console.log(`Listening on http://localhost:${port}`);
}

app.listen(port, handleListening);