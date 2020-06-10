const {Schema, model} = require('mongoose');
const mongoose = require('mongoose')

const schema = new Schema({
    title: {type: String, required: true},
    text: {type: String, required:true},
    files: [{type: String}],
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }]
},
    {timestamps: true}
    )

module.exports = model('Post', schema)
