const mongoose = require('mongoose');
const {isEmail} = require('validator');
const bcryptjs = require('bcryptjs');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true,"Username required"],
        unique: true,
    },
    email: {
        type: String,
        required: [true,"Email address required"],
        unique: true,
        validate: [isEmail,'Invalid email address'],
        lowercase: true,
    },
    password: {
        type: String,
        required: [true,"Password required"],
        minlength: [5,"Password is too short"],
    },
},{
    timestamps: true,
});

userSchema.pre('save',function(next){
    this.password = bcryptjs.hashSync(this.password,8)
    next();
})

module.exports = mongoose.model("User",userSchema);