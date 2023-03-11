const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: {
        type: String, 
        required: true
    },
    password: {
        type: String,
        required: true
    },
    emailid: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: false
    },
    
    friends: [
        {
            userid: mongoose.Types.ObjectId,
            username: String,
        }
    ],
    friendrequestsrecieved: [
        {
            userid: mongoose.Types.ObjectId,
            username: String,
        }
    ],
    friendrequestssent: [
        {
            userid: mongoose.Types.ObjectId,
            username: String,
        }
    ]

})

module.exports = User = mongoose.model('user', UserSchema)