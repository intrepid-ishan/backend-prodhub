const mongoose = require('mongoose');

// define a schema
const categorySchema = new mongoose.Schema({
    name: {
        type: String, 
        trim: true,
        required: true,
        maxlength: 32, 
        unique: true
    }
}, { timestamps: true });

//compile our model and export
module.exports = mongoose.module("Category", categorySchema);