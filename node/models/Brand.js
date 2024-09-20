const mongoose = require('mongoose');


const BrandSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    year: {type: String},
    logo: {
        type: String,
        required: false,
    }
})

module.exports = mongoose.model('Brand', BrandSchema)