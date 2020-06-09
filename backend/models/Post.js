const {Schema, model, Types} = require('mongoose');
const mongoose = require('mongoose')

const schema = new Schema({
    title: {type: String, required: true},
    text: {type: String, required:true},
    file: String,
    author: {
        type: Types.ObjectId,
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
