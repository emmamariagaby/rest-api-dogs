const express = require('express')
const app = express()
const bodyParser = require('body-parser')
// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

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
app.get('/', (req, res) => {
  res.send('Dog api');
});

// read 
app.get('/api/dogs', (req, res) => {
  res.send(dogs);
});

// read and get individual dog id
app.get('/api/dogs/:id', (req, res) => {
  let id = dogs.find((dog) => dog.id === parseInt(req.params.id))
  // checks if dog exists or not in database
  if (!id) {
    return res.status(404).send({
      message: 'dog does not exist in this database',

    });
  } else
    return res.status(200).send({
      message: 'this dog exists in this database',
    });
});

// create new dog to database
app.post('/api/dogs/', (req, res) => {
  if (!req.body.name) {
    return res.status(400).send({
      message: 'dog name is required'
    });
  } else if (!req.body.breed) {
    return res.status(400).send({
      message: 'dog breed is required'
    });
  }
  const addDog = {
    id: dogs.length + 1,
    name: req.body.name,
    breed: req.body.breed
  }
  // 201 created
  dogs.push(addDog);
  return res.status(201).send({
    message: 'dog added successfully to database',
    dogs
  })
});

//update new dog to database
app.put('/api/dogs/:id', (req, res) => {
  const id = parseInt(req.params.id);
  let dogFound;
  let itemIndex;
  dogs.map((dog, index) => {
    if (dog.id === id) {
      dogFound = dog;
      itemIndex = index;
    }
  });

  if (!dogFound) {
    return res.status(404).send({
      message: 'dog not found',
    });
  }

  if (!req.body.name) {
    return res.status(400).send({
      message: 'dog name is required',
    });
  } else if (!req.body.breed) {
    return res.status(400).send({
      message: 'dog breed is required',
    });
  }

  const updateDog = {
    id: dogFound.id,
    name: req.body.name || dogFound.name,
    breed: req.body.breed || dogFound.breed,
  };

  dogs.splice(itemIndex, 1, updateDog);

  return res.status(201).send({
    message: 'dog added successfully to database',
  });
});

//delete dog from database
app.delete('/api/dogs/:id', (req, res) => {
  const id = parseInt(req.params.id);

  dogs.map((dog, index) => {
    if (dog.id === id) {
      dogs.splice(index, 1);
      return res.status(200).send({
        message: 'Dog deleted successfully from database',
      });
    }
  });

  //when trying to delete non existing dog
  //404 not found
  return res.status(404).send({
    message: 'dog not found',
  });


});

// setup port 
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port http://localhost:${port}`));

