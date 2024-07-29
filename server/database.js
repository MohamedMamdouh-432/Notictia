const mongoose = require('mongoose')
const Note = require('./schemas/note')

class Database {
    constructor() {
        this.url =
            process.env.MONGODB_URL ||
            'mongodb+srv://mohamed:AZbKJ5lQeRv1Swl2@cluster0.n0mahic.mongodb.net/notictia?retryWrites=true&w=majority&appName=Cluster0'
    }

    connect() {
        mongoose
            .connect(this.url)
            .then(() => console.log('Database is connected successfully ✅'))
            .catch((err) =>
                console.log('Database connection is failed ❌', err)
            )
    }

    addNote(note) {
        return new Promise((resolve, reject) => {
            Note.create(note)
                .then((doc) => resolve(doc))
                .catch((err) => reject(err))
        })
    }

    getAllNotes(title) {
        return new Promise((resolve, reject) => {
            Note.find(
                title ? { title: { $regex: new RegExp(title, 'i') } } : {}
            )
                .then((data) => resolve(data))
                .catch((err) => reject(err))
        })
    }

    getNote(title) {
        return new Promise((resolve, reject) => {
            Note.findOne({ title: { $regex: new RegExp(title, 'i') } })
                .then((doc) => resolve(doc))
                .catch((err) => reject(err))
        })
    }

    updateNote(title, note) {
        return new Promise((resolve, reject) => {
            Note.findOneAndUpdate(
                { title: { $regex: new RegExp(title, 'i') } },
                note
            )
                .then((doc) => resolve(doc))
                .catch((err) => reject(err))
        })
    }

    deleteNote(title) {
        return new Promise((resolve, reject) => {
            Note.deleteOne({ title: { $regex: new RegExp(title, 'i') } })
                .then((doc) => resolve(doc))
                .catch((err) => reject(err))
        })
    }
}

module.exports = new Database()
