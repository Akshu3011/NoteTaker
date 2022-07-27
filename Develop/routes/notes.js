const note = require('express').Router();
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');


// GET Route for retrieving all the notes data
note.get('/', (req, res) => {
  console.info(`${req.method} request received for notes`);

  readFromFile('./Develop/db/db.json',"utf-8").then((data) => res.json(JSON.parse(data)));
});

// POST Route for submitting feedback
note.post('/', (req, res) => {
  // Log that a POST request was received
  console.info(`${req.method} request received to add notes`);

  // Destructuring assignment for the items in req.body
  const { title, text } = req.body;

  // If all the required properties are present
  if (title && text) {
    // Variable for the object we will save
    const newNote = {
      title: req.body.title,
      text: req.body.text,
      id: uuid(),
    };

    readAndAppend(newNote, './Develop/db/db.json');

    const response = {
      status: 'success',
      body: newNote,
    };

    res.json(response);
  } else {
    res.json('Error in adding note');
  }
});


//DELETE req



module.exports = note;
