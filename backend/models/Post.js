const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
    title: {type: String, required: true},
    text: {type: String, required:true},
    file: String,
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    author: {
        type: Types.ObjectId,
        ref: 'User'
    },
    comments: [{
        type: Types.ObjectId,
        ref: 'Comment'
    }]
})

module.exports = model('Post', schema)
