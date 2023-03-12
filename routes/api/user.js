const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
require('dotenv').config()


// JWT for Authentication
const jwt = require('jsonwebtoken')



const app = express()
app.use(express.json())



const saltrounds = parseInt(process.env.SALT_ROUNDS)


const User = require('../../models/usermodel')



router.post('/api/createuser', async (req, res) => {

    
    const user = new User({
        username: req.body.username,
        password: req.body.password,
        emailid : req.body.emailid
    })

    const usern = req.body.username
    const usere = req.body.emailid

    await checkDuplicateUser(usern, usere, res)


    bcrypt.hash(user.password, saltrounds, (err, hash) => {
        // console.log('running')
        if (err) {
            res.end('User creation Failed, Retry')
            throw err
        }

        user.password = hash
        insertUser(user)
        return res.end('User Created')
    })
    


            
})  



// Check if username / emailid already in use

async function checkDuplicateUser(usern, usere, res) {



    User.find({}, {'emailid' : 1, 'username' : 1, '_id': 0}).then(data => {

        // console.log(data)
        for (dt of data) {

            // console.log('walking')
            // console.log(dt)
            if (usern === dt.username) {
                res.end('This username is already in use')
                return false
            }

            if (usere === dt.emailid) {
                // console.log(dt.emailid)
                res.end('This Email ID is already in use')
                return false
            }
        }

        
    })

    
}


// Create new user
async function insertUser(user) {
    const response = await user.save()
}


// Verify User Login

router.post('/api/verifyuser', async (req, res) => {

    User.findOne({ username: req.body.username }).then((user) => {
 
        if (!user) {
            res.json({loginStatus : 'Login Failed : Incorrect Username'})
            return false
        }
  
        bcrypt.compare(req.body.password, user.password, (err, rs) => {
          if (rs) {
                // Generate auth token and send as repsonse
                const accessToken = jwt.sign(req.body.username, process.env.JWT_ACCESS_TOKEN)
                res.json({ accessToken : accessToken, loginStatus : 'Login Successfull', username: req.body.username})
            //   res.end('Login Successfull')
              return true
          } else {
              res.json({loginStatus : 'Login Failed : Incorrect Password'})
              return false
          }
        })
      });
})





// Get user details 

router.post('/api/getuser',authenticateToken, async(req, res) => {

    
    User.findOne({ username: req.body.username }).then((user) => {
        res.json(user)
    })

})


// Get all users names and id

router.get('/api/getallusers', async (req, res) => {
    User.find({}, {"username" : 1, "_id": 1}).then((users) => {
        res.json(users)
    })
})

// Authentication Service Middleware

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    // console.log(authHeader)
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.JWT_ACCESS_TOKEN, (err, user) => {
        if (err) return res.sendStatus(403)
        req.user = user
        next()
    })
    
}



module.exports = {router, authenticateToken, insertUser}