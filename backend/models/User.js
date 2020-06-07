const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
    email: {type: String, required: true, unique: true},
    name:{type: String, required: true, unique: true},
    password: {type: String, required: true},
    role: {type: String, default: 'user'},
    posts: [{type: Types.ObjectId, ref: 'Post'}]
})

module.exports = model('User', schema)
