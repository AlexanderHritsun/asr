const {Schema, model} = require('mongoose');
const mongoose = require('mongoose')

const schema = new Schema({
    name: {type: String, required: true},
    description: {type: String, required:true},
    rating: {type: Number, default: 0},
    files: [{type: String}],
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review'
    }]
})

module.exports = model('Service', schema)
