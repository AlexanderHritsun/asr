const {Schema, model} = require('mongoose');
const mongoose = require('mongoose')

const schema = new Schema({
    text: {type: String, required:true},
    rating:{type: Number, required: true},
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},
    {timestamps: true}
)

module.exports = model('Review', schema)
