const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
    text: {type: String, required:true},
    createdAt:{
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = model('Comment', schema)
