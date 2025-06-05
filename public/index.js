import Note from "./note.js";
const noteBox = document.getElementById("notes");
const input = document.getElementById("input");
const updateInput = document.getElementById("updateNote");
const createBtn = document.getElementById("create");
let notes;
let inputText = "";
let updatedText = "";

const fetchNotes = async () => {
  try {
    const response = await fetch("http://localhost:8080/api/notes", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    notes = data;
    if (!response) {
      throw new Error(response.status);
    }

    notes.forEach((n) => {
      const note = new Note(n.text, n.id);
      noteBox.appendChild(note.create());
    });

    console.log(notes);
  } catch (error) {
    console.error(error);
  }
};
fetchNotes();

const refreshNotes = async () => {
  noteBox.replaceChildren();
  await fetchNotes();
};

const createNote = async (text) => {
  try {
    const response = await fetch("http://localhost:8080/api/notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: Math.random().toFixed(12) * 100000,
        text: text,
      }),
    });
    if (!response.ok) {
      throw new Error(response.status);
    }
    await refreshNotes();
  } catch (error) {
    console.error(error);
  }
};

export const deleteNote = async (id) => {
  try {
    const response = await fetch(`http://localhost:8080/api/notes/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
      throw new Error(response.status);
    }
    await refreshNotes();
  } catch (error) {
    console.error(error);
  }
};

export const updateNote = async (id) => {
  try {
    if (updatedText.trim() === "") {
      console.log("A raw string isn't an update!");
      return;
    }
    const response = await fetch(`http://localhost:8080/api/notes/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ updatedText: updatedText }),
    });
    console.log("fetch");
    if (!response.ok) {
      return new Error(response.status);
    }
    await refreshNotes();
    console.log("refresh");
  } catch (error) {
    console.error(error);
  }
};

input.addEventListener("change", (e) => {
  e.preventDefault();
  inputText = e.target.value;
});

updateInput.addEventListener("change", (e) => {
  e.preventDefault();
  updatedText = e.target.value;
});

createBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (inputText.trim() === "") {
    return;
  } else {
    createNote(inputText);
  }
});
