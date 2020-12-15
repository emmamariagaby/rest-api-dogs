const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const { response } = require('express');
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
  if (validateNameAndBreed(req, res)) {
    addDog(req);
    sendOKResponse(res);
  }
});

function sendOKResponse(res) {
  res.status(201).send({
    message: 'dog added successfully to database',
    dogs
  })
}

function addDog(req) {
  let dog = createDog(req.body.name, req.body.breed);
  dogs.push(dog)
}

function createDog(name, breed) {
  let dog = {
    id: dogs.length + 1,
    name: name,
    breed: breed
  }
  return dog;
}

function validateNameAndBreed(req, res) {
  if (!req.body.name) {
    res.status(400).send({
      message: 'dog name is required'
    });

    return false;

  } else if (!req.body.breed) {
    res.status(400).send({
      message: 'dog breed is required'
    });
    return false;

  } else {
    return true;
  }
}

//update new dog to database
app.put('/api/dogs/:id', (req, res) => {

  let updateEntity = findDogById(req.params.id);

  if (!updateEntity.dog) {
    sendDogNotFoundMessage(res)
    return;
  }

  if (validateNameAndBreed(req, res)) {
    const updateDog = {
      id: dogFound.id,
      name: req.body.name || dogFound.name,
      breed: req.body.breed || dogFound.breed,
    };
    dogs.splice(itemIndex, 1, updateDog);
    sendOKResponse(res);
  }
});

function sendDogNotFoundMessage(res) {
  res.status(404).send({
    message: 'dog not found',
  });
}

function findDogById(id) {
  let dogFound;
  let dogIndex;

  dogs.map((dog, index) => {
    if (dog.id === id) {
      dogFound = dog;
      dogIndex = index;
    }
  });

  return {
    dog: dogFound,
    dogIndex: dogIndex
  }
}

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

