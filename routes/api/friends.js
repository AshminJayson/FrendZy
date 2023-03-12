
const express = require('express')
const router = express.Router()
require('dotenv').config()

const userserver = require('./user')
const auth = userserver.authenticateToken
const insertUser = userserver.insertUser


const app = express()
app.use(express.json())


// Get user friends 

router.get('/api/getfriends', async (req, res) => {
    User.findOne({username : req.body.username}, {"friends" : 1, "_id" : 0}).then((user) => {
        if(user) {
            res.json(user.friends)
        }
        else {
            res.json('No user exists')
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

            insertUser(currentuser)
            insertUser(requesteduser)

            res.send('Friend Request Sent')
        })
    })

})

// Accept friend request



router.post('/api/acceptfriendrequest', async (req, res) => {
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


                try {
                insertUser(currentuser)
                insertUser(requesteduser)
                    res.send('Friend Request Accepted')
                }
                catch {
                    res.send('Error')
                }


                
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

            res.send('User has been added as a friend')
        })
    })

}





// Get mutual friends
router.get('/api/getmutualfriends', async (req, res) => {
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