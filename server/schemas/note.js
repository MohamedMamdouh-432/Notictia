const { Schema, model } = require("mongoose");

const noteScheme = new Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    createdDate: {
        type: Date,
        default: Date.now(),
    },
    updatedDate: {
        type: Date,
        default: Date.now(),
    },
});

const Note = model("notes", noteScheme);

module.exports = Note;
