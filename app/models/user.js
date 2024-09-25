const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    nickname: {
        type: String,
        unique: true,
        required: true,
        
    },
    password: String,
    role: {
        type: String,
        default: 'user',
    },
    favourites: {
        type: Array,
        default:[],
    },

});

exports.UserModel = mongoose.model("User", userSchema)