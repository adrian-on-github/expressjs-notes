import { deleteNote, updateNote } from "./index.js";

export default class Note {
  constructor(text, id) {
    this.noteText = text;
    this.id = id;
  }
  create() {
    const textContainer = document.createElement("div");
    const btnContainer = document.createElement("div");
    let noteDiv = document.createElement("div");
    noteDiv.setAttribute("class", "noteDiv");
    noteDiv.setAttribute("id", this.id);

    let noteText = document.createElement("h3");
    noteText.textContent = this.noteText;

    let delButton = document.createElement("button");
    delButton.setAttribute("id", "delete");
    delButton.textContent = "DELETE";

    let putButton = document.createElement("button");
    putButton.setAttribute("id", "put");
    putButton.textContent = "UPDATE";

    noteDiv.appendChild(textContainer);
    noteDiv.appendChild(btnContainer);

    textContainer.appendChild(noteText);
    btnContainer.appendChild(putButton);
    btnContainer.appendChild(delButton);

    delButton.addEventListener("click", (e) => {
      e.preventDefault();
      this._remove(this.id);
    });

    putButton.addEventListener("click", (e) => {
      e.preventDefault();
      this._update(this.id, this.text);
    });

    return noteDiv;
  }

  _remove(id) {
    const notes = document.getElementById("notes");
    const removeThisDiv = document.getElementById(id);
    if (notes && removeThisDiv) {
      deleteNote(id);
    }
  }
  _update() {
    updateNote(this.id);
  }
}
