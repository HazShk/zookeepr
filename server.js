const { animals } = require("./data/animals.json");

const express = require("express");
//instantiate the server
const app = express();

//filter by query
function filterByQuery(query, animalsArray) {
  let personalityTraitsArray = [];
  //note that we save the animalsArray as filteredResults here
  let filteredResults = animalsArray;
  if (query.personalityTraitsArray) {
    //save personalitytraits as a dedicated array
    //if personalitytraits is a string, place it into a new array and save.
    if (typeof query.personalityTraitsArray === "string") {
      personalityTraitsArray = [query.personalityTraitsArray];
    } else {
      personalityTraitsArray = query.personalityTraitsArray;
    }
    // loop through each trait in the personalitytraits array
    personalityTraitsArray.foreach((trait) => {
      // Check the trait against each animal in the filteredResults array.
      // Remember, it is initially a copy of the animalsArray,
      // but here we're updating it for each trait in the .forEach() loop.
      // For each trait being targeted by the filter, the filteredResults
      // array will then contain only the entries that contain the trait,
      // so at the end we'll have an array of animals that have every one
      // of the traits when the .forEach() loop is finished.
      filteredResults = filteredResults.filter(
        (animal) => animal.personalityTraitsArray.indexOf(trait) !== -1
      );
    });
  }
  if (query.diet) {
    filteredResults = filteredResults.filter(
      (animal) => animal.diet === query.diet
    );
  }
  if (query.species) {
    filteredResults = filteredResults.filter(
      (animal) => animal.species === query.species
    );
  }
  if (query.name) {
    filteredResults = filteredResults.filter(
      (animal) => animal.name === query.name
    );
  }
  return filteredResults;
}

//filter by id
function findById(id, animalsArray) {
  const result = animalsArray.filter((animal) => animal.id === id)[0];
  return result;
}

//add route

app.get('/api/animals/:id', (req, res) => {
  const result = findById(req.params.id, animals);
  if (result) {
    res.json(result);
  } else {
    res.send(404);
  }
});

app.get("/api/animals", (req, res) => {
  let results = animals;
  console.log(req.query);
  if (req.query) {
    results = filterByQuery(req.query, results);
  }

  //send json
  res.json(results);
});

app.listen(3001, () => {
  console.log("API server now on port 3001");
});
