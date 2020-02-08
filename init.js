import app from './app';

const PORT = 3000;

const handlelistening = () =>
    console.log(`☞ Listening on http://localhost:${PORT}`);

app.listen(PORT, handlelistening);