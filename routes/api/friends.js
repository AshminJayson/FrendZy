
const express = require('express')
const router = express.Router()
require('dotenv').config()

const userserver = require('./user')
const auth = userserver.authenticateToken
const insertUser = userserver.insertUser


const app = express()
app.use(express.json())


// Get user friends 

router.post('/api/getfriends', async (req, res) => {
    User.findOne({username : req.body.username}, {"friends" : 1, "_id" : 0}).then((user) => {
        if(user) {
            res.json(user.friends)
        }
        else {
            res.json('No user exists')
        }

    })
})


router.post('/api/getfriendrequests', async (req, res) => {
    User.findOne({username: req.body.username}, {"friendrequestsrecieved" : 1}).then((users) => {
        if(users) {
            res.json(users.friendrequestsrecieved)
        }
        else {
            res.json('No requests')
        }
    })
})

// Send friend request


router.post('/api/sendfriendrequest', async (req, res) => {


    User.findOne({username: req.body.currentuser}).then((currentuser) => {
        User.findOne({username: req.body.requesteduser}).then((requesteduser) => {
            currentuser.friendrequestssent.push({
                userid: requesteduser._id,
                username: requesteduser.username
            })

            requesteduser.friendrequestsrecieved.push({
                userid: currentuser._id,
                username: currentuser.username
            })

            insertUser(currentuser).then(insertUser(requesteduser)).then()
            res.send('Friend Request Sent')

        })
    })

})

// Get status 

router.post('/api/getrelation',auth, async (req, res) => {
    User.findOne({username: req.body.currentuser}).then((currentuser) => {
        User.findOne({username: req.body.requesteduser}).then((requesteduser) => {
            
            header = ''
            for (let usera of requesteduser.friends) {
                if (currentuser._id.equals(usera.userid))
                    header = 'friends'
            }

            for (let usera of requesteduser.friendrequestsrecieved) {
                // console.log(usera, currentuser)
                if (currentuser._id.equals(usera.userid)) 
                    header = 'friend req sent'
                
            }

            for (let usera of requesteduser.friendrequestssent) {
                if (currentuser._id.equals(usera.userid)) 
                    header = 'friend req recieved'
                
            }

            if (header === '')
                header = 'no connection'
            res.send(header)
        })
    })
})

// Accept friend request

router.post('/api/acceptfriendrequest', async (req, res) => {

    // console.log(req.body.currentuser, req.body.requesteduser)
    User.findOne({username: req.body.currentuser}).then((currentuser) => {
        User.findOne({username: req.body.requesteduser}).then((requesteduser) => {
            
            addfriend(req, res).then(() => {
                
                // console.log(currentuser, requesteduser)
                currentuser.friendrequestsrecieved.pull({
                    userid: requesteduser._id,
                    username: requesteduser.username
                })
                
                requesteduser.friendrequestssent.pull({
                    userid: currentuser._id,
                    username: currentuser.username
                })

                insertUser(currentuser)
                insertUser(requesteduser)

                res.send('User has been added as a friend')

                
            })
        })
    })
})


// Decline friend request

router.post('/api/declinefriendrequest', async (req, res) => {
    User.findOne({username: req.body.currentuser}).then((currentuser) => {
        User.findOne({username: req.body.requesteduser}).then((requesteduser) => {
                
        // console.log(currentuser, requesteduser)
        currentuser.friendrequestsrecieved.pull({
            userid: requesteduser._id,
            username: requesteduser.username
        })
        
        requesteduser.friendrequestssent.pull({
            userid: currentuser._id,
            username: currentuser.username
        })


        try {
            insertUser(currentuser)
            insertUser(requesteduser)
                res.send('Friend Request Declined')
            }
            catch {
                res.send('Error')
            }
        })
    })
})


// Remove user as friend

router.post('/api/unfrienduser', async (req, res) => {
    User.findOne({username: req.body.currentuser}).then((currentuser) => {
        User.findOne({username: req.body.requesteduser}).then((requesteduser) => {
                
        // console.log(currentuser, requesteduser)
        currentuser.friends.pull({
            userid: requesteduser._id,
            username: requesteduser.username
        })
        
        requesteduser.friends.pull({
            userid: currentuser._id,
            username: currentuser.username
        })


        try {
            insertUser(currentuser)
            insertUser(requesteduser)
                res.send('Unfriended')
            }
            catch {
                res.send('Error')
            }
        })
    })
})


// Cancel friend request

router.post('/api/cancelfriendrequest', async (req, res) => {
    User.findOne({username: req.body.currentuser}).then((currentuser) => {
        User.findOne({username: req.body.requesteduser}).then((requesteduser) => {
                
        // console.log(currentuser, requesteduser)
        currentuser.friendrequestssent.pull({
            userid: requesteduser._id,
            username: requesteduser.username
        })
        
        requesteduser.friendrequestsrecieved.pull({
            userid: currentuser._id,
            username: currentuser.username
        })


        try {
            insertUser(currentuser)
            insertUser(requesteduser)
                res.send('Friend Request Cancelled')
            }
            catch {
                res.send('Error')
            }
        })
    })
})



// Add user as friend 

router.post('/api/addfriend', async (req, res) =>  {

    await addfriend(req, res)

})

async function addfriend(req, res) {

    User.findOne({username: req.body.currentuser}).then((currentuser) => {
        User.findOne({username: req.body.requesteduser}).then((requesteduser) => {


            currentuser.friends.push({
                userid : requesteduser._id,
                username : requesteduser.username
            })

            requesteduser.friends.push({
                userid: currentuser._id,
                username : currentuser.username
            })


            insertUser(currentuser)
            insertUser(requesteduser)
        })
    })

}





// Get mutual friends
router.post('/api/getmutualfriends', async (req, res) => {
    User.findOne({username : req.body.currentuser}, {"friends" : 1, "_id" : 0}).then((user) => {
        let currentuserfriends = user.friends

        User.findOne({username: req.body.requesteduser}, {"friends" : 1, "_id": 0}).then((cuser) => {
            let requesteduserfriends = cuser.friends

            let mutualfriends = new Set()
            for (let usera of currentuserfriends) {
                for (let userb of requesteduserfriends) {
                    if (usera.userid.equals(userb.userid)) {
                        mutualfriends.add(usera)
                    }
                }
            }

            res.send(Array.from(mutualfriends))
        })


    })
})

module.exports = router