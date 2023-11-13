const mongoose = require('mongoose')
const bcryptjs = require('bcryptjs')
const {isEmail} = require('validator')

const Schema = mongoose.Schema

const use_schema = new Schema({
    username: {
        type: String,
        required: [true,"Username required"],
        unique: true,
    },
    email: {
        type: String,
        required: [true,'Email address required'],
        unique: true,
        validate: [isEmail,"Invalid email address"],
    },
    password: {
        type: String,
        required: [true,'Password required'],
        minlength: [5,"Too short password"]
    },
},{
    timestamps: true
})

use_schema.pre('save',function(next){
    this.password = bcryptjs.hashSync(this.password,10)
    next()
})


module.exports = mongoose.model('User',use_schema)