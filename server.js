const express = require("express");
const path = require("path");
const cors = require("cors");
const app = express();

const PORT = 8080;

const notes = [];

app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(express.static(path.join(__dirname, "public")));

const logger = (req, res, next) => {
  console.log(
    `${req.method} ${req.protocol}://${req.get("host")}${req.originalUrl}`
  );
  next();
};

app.get("/api/notes", logger, (req, res) => {
  res.json(notes);
});

app.post("/api/notes", logger, (req, res) => {
  notes.push(req.body);
  return res.status(200).json({ message: "Note deleted" });
});

app.delete("/api/notes/:id", logger, (req, res) => {
  const id = req.params.id;
  const index = notes.find((n) => String(n.id) === id);
  if (index) {
    notes.splice(index, 1);
    return res.status(200).json({ message: "Note deleted" });
  }
  res.status(404).json({ message: "Note not found" });
});

app.put("/api/notes/:id", logger, (req, res) => {
  const id = req.params.id;
  const { updatedText } = req.body;

  const updatedNote = notes.find((n) => String(n.id) === id);
  if (updatedNote && updatedText) {
    updatedNote.text = updatedText;
    res.status(200).json({ message: "Note updated" });
  } else {
    res.status(404).json({ message: "Note not found" });
  }
});

app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);
});
