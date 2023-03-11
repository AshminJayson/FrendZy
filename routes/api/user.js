const express = require('express')
const app = express()
const router = express.Router()
const bcrypt = require('bcryptjs')
require('dotenv').config()


// JWT for Authentication
const jwt = require('jsonwebtoken')
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

    const flag = await checkDuplicateUser(usern, usere, res)

    if (flag) { 
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
    }
            
})  



async function checkDuplicateUser(usern, usere, res) {


    let flag = true
    User.find({}, {'emailid' : 1, 'username' : 1, '_id': 0}).then(data => {

        data.every((dt) => {
            // console.log('walking')
            // console.log(dt)
            if (usern === dt.username) {
                flag = false
                res.end('This username is already in use')
                return false
                
            }
            if (usere === dt.emailid) {
                flag = false
                // console.log(dt.emailid)
                res.end('This Email ID is already in use')
                    return false
                }
        })

        
    })

    // console.log(flag)
    return flag
    
}

async function insertUser(user) {
    const response = await user.save()
    // console.log(response)
}


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
                res.json({ accessToken : accessToken, loginStatus : 'Login Successfull'})
            //   res.end('Login Successfull')
              return true
          } else {
              res.json({loginStatus : 'Login Failed : Incorrect Password'})
              return false
          }
        })
      });
})






router.get('/api/random', authenticateToken, (req, res) => {
    console.log(req.user)
    res.send('helloo')

})

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    console.log(authHeader)
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.JWT_ACCESS_TOKEN, (err, user) => {
        if (err) return res.sendStatus(403)
        req.user = user
        next()
    })
    
}

module.exports = router