const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const database = require("./database");

const port = 3000;
const serverApp = express();
const db = new database();

serverApp.use(cors());
serverApp.use(bodyParser.json());
serverApp.use(bodyParser.urlencoded({ extended: false }));

serverApp.post("/notictia/notes", (req, res) => {
    db.addNote(req.body)
        .then((data) => res.send(data))
        .catch((err) => res.send(err));
});

serverApp.get("/notictia/notes", (req, res) => {
    db.getAllNotes()
        .then((data) => res.send(data))
        .catch((err) => res.send(err));
});

serverApp.get("/notictia/notes/:title", (req, res) => {
    db.getNote(req.params.title)
        .then((data) => res.send(data))
        .catch((err) => res.send(err));
});

serverApp.put("/notictia/notes/:title", (req, res) => {
    db.updateNote(req.params.title, req.body)
        .then((data) => res.send(data))
        .catch((err) => res.send(err));
});

serverApp.delete("/notictia/notes/:title", (req, res) => {
    db.deleteNote(req.params.title)
        .then((data) => res.send(data))
        .catch((err) => res.send(err));
});

serverApp.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}/notictia`);
    db.connect();
});
