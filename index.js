import express from 'express';
const app = express();
const port = 3000;

const handleListening = () => console.log(`Listening on http://localhost:${port}`);

const handleHome = (req, res) => res.send('Welcome Home!!');

const handleProfile = (req, res) => res.send('Hi My name is jjanmo');

app.get('/', handleHome);

app.get('/profile', handleProfile);

app.listen(port, handleListening);


