const {Schema, model} = require('mongoose');
const mongoose = require('mongoose')

const schema = new Schema({
    email: {type: String, required: true, unique: true},
    name:{type: String, required: true, unique: true},
    password: {type: String, required: true},
    role: {type: String, default: 'user'},
    posts: [{type: mongoose.Schema.Types.ObjectId, ref: 'Post'}]
})

module.exports = model('User', schema)
