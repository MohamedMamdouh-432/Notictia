const { Schema, model } = require('mongoose')

const noteScheme = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
)

module.exports = model('notes', noteScheme)