const noteTitle = document.querySelector(".note-title");
const noteText = document.querySelector(".note-textarea");
const saveBtn=document.querySelector(".fa-save");
const addNote =document.querySelector(".fa-plus");

// Handle when a user submits feedback
saveBtn
  .addEventListener('click', (e) => {
    e.preventDefault();

    // Get the title text from the DOM and assign it to a variable
    let title = noteTitle.value;
    // Get the note text and add it to a variable
    let text = noteText.value.trim();

    // Create an object for Notes
    const newNote = {
      title,
      text
    };

    // Fetch POST request to the server
    fetch('api/notes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newNote),
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.status);
        title = '';
        text = '';
      });
  })
  .catch((error) => {
    console.error('Error:', error);
  });
