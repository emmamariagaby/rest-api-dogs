const express = require('express')
const app = express()

// dog api 
const dogs = [
    {   
        id: 1111,
        name: "Bellman",
        breed: "Staffordshire bullterrier",
    },
    {   
        id: 2222,
        name: "Tova",
        breed: "Retriever mix",
    },
    {   
        id: 3333,
        name: "Love",
        breed: "Pomeranian",
    },
    {   
        id: 4444,
        name: "Texas",
        breed: "Dachshund",
    },
    {   
        id: 5555,
        name: "Astrid",
        breed: "Petit brabancon",
    },
]

// read
app.get('/', (req, res) =>  {
    res.send('Dog api');
});

// read array
app.get('/api/dogs', (req, res) => {
    res.send(dogs);
});

// read and get individual dog id
app.get('/api/dogs/:id', (req, res) => {
    let id = dogs.find((dog) => dog.id === parseInt(req.params.id))
    
      if (!id) {
        return res.status(404).send({
         message: 'dog does not exist in this database',
        
        
                  });
      } else
      return res.status(200).send({
      message: 'this dog exists in this database',
    });
  });


// setup port 
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port http://localhost:${port}`));

