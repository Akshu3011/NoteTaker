const note = require('express').Router();
const { readFromFile, readAndAppend,writeToFile } = require('../helpers/fsUtils');
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

note.delete('/:id',(req,res) =>{
  console.info(`${req.method} request received to delete notes`);
 // const Delid = req.params;
 
 console.log("id  "+req.params.id);
 const newNote=[];
  readFromFile('./Develop/db/db.json',"utf-8").then((notes) => {
   // console.log((JSON.parse(notes))[0].id);
    for(let i=0;i<(JSON.parse(notes)).length;i++)
    {
      if((JSON.parse(notes))[i].id != req.params.id)
      {
        console.log((JSON.parse(notes))[i]);
        newNote.push((JSON.parse(notes))[i]);
      }
    }
   //console.log(newNote);
   writeToFile('./Develop/db/db.json',newNote);
   }
   );
});
  

module.exports = note;
