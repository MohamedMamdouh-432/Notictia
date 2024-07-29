const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const db = require('./database')

const app = express()

app.use(cors())
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.post('/notictia/note', (req, res) => {
    db.addNote(req.body)
        .then((data) => res.send(data))
        .catch((err) => res.status(500).send(err))
})

app.get('/notictia/notes', (req, res) => {
    if (req.query.title) {
        db.getAllNotes(req.query.title)
            .then((data) => res.send(data))
            .catch((error) => res.status(500).send(error))
    } else {
        db.getAllNotes()
            .then((data) => res.send(data))
            .catch((error) => res.status(500).send(error))
    }
})

app.get('/notictia/note/:title', (req, res) => {
    db.getNote(req.params.title)
        .then((data) => {
            if (!data)
                res.status(404).send(
                    `Note with title ${req.params.title} doesn't exist`
                )
            else res.send(data)
        })
        .catch((err) => res.status(500).send(err))
})

app.patch('/notictia/note/:title', (req, res) => {
    db.updateNote(req.params.title, req.body)
        .then((data) => res.send(data))
        .catch((err) => res.send(err))
})

app.delete('/notictia/note/:title', (req, res) => {
    db.deleteNote(req.params.title)
        .then((data) => res.send(data))
        .catch((err) => res.send(err))
})

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}/notictia 🔥`)
    db.connect()
})
