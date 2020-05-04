const express = require('express')
const app = express()

// read
app.get('/', (req, res) =>  {
    res.send('Dog api');
});

// read array
app.get('/api/dogs', (req, res) => {
    res.send([1, 2, 3]);
});

// read and get individual id
app.get('/api/dogs/:id', (req, res) => {
    res.send(req.params.id);
});

// setup port 
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port http://localhost:${port}`));

