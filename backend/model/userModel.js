const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please Enter Your Beautful Name']
    },
    email: {
        type: String,
        required: [true, 'Please Enter Your Unique Email'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please Enter Your Strong Password']
    },
},
    {
        timestamps: true
    }
)


module.exports = mongoose.model('user' , userSchema)