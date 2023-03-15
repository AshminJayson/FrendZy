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
    },

    dateofbirth : {
        // Date stored as string instead of date since there isn't a need for timezone
        type: String,
    },
    
    gender : {
        type: String
    },

    profileurl : {
        type: String
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