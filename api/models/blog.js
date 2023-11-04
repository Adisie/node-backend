const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    body: {
        type: String,
        required: true,
    },
},{
    timestamps: true,
})

module.exports = mongoose.model("Blog",blogSchema);