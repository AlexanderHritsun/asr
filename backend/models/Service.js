const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
    name: {type: String, required: true},
    description: {type: String, required:true},
    rating: Number,
    file: String,
    reviews: {
        type: Schema.Types.ObjectId,
        ref: 'Review'
    }
})

module.exports = model('Service', schema)
