const mongoose = require("mongoose");
const Note = require("./schemas/note");

class database {
    constructor() {
        this.url = "mongodb://localhost:27017/notictia";
    }

    connect() {
        mongoose
            .connect(this.url)
            .then(() => {
                console.log("Database connected successfully");
            })
            .catch((err) => {
                console.log("Database connection failed", err);
            });
    }

    addNote(note) {
        return new Promise((resolve, reject) => {
            const newNote = new Note(note);
            newNote
                .save()
                .then((doc) => resolve(doc))
                .catch((err) => reject(err));
        });
    }
    
    getAllNotes() {
        return new Promise((resolve, reject) => {
            Note.find()
                .then((doc) => resolve(doc))
                .catch((err) => reject(err));
        });
    }
    
    getNote(title) {
        return new Promise((resolve, reject) => {
            Note.findOne({title: title})
                .then((doc) => resolve(doc))
                .catch((err) => reject(err));
        });
    }
    
    updateNote(title, note) {
        return new Promise((resolve, reject) => {
            Note.findOneAndUpdate({title: title}, note)
                .then((doc) => resolve(doc))
                .catch((err) => reject(err));
        });
    }
    
    deleteNote(title) {
        return new Promise((resolve, reject) => {
            Note.deleteOne({title: title})
                .then((doc) => resolve(doc))
                .catch((err) => reject(err));
        });
    }
}

module.exports = database;
