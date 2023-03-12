import './Login.css'
import axios from 'axios'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaBattleNet } from 'react-icons/fa'




export function Signup() {

    
    const navigate = useNavigate()
    const [user, createUser] = useState({
        username:  '', 
        emailid: '',
        password: '',
        cpassword: '',
        
    })

    function clearForm() {
        document.getElementById('signup-form').reset()
    }

    function validateEmail(emailid) {
        const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        if (emailid.match(regex)) {
            return true
        }
        
        return false
        
    }

    function validatePassword(password, confirmpassword) {

        let cp = document.getElementsByName('cpassword')[0]
        let p = document.getElementsByName('password')[0]
        document.get
        if (password.length < 8) {
            p.placeholder = "Password has good personality but make it longer than 8"
            p.value = ''
            p.classList += 'error'
            cp.classList += 'error'
            return false
        }
        if (password !== confirmpassword) {
            cp.placeholder = "Passwords don't match"
            cp.value = ''
            cp.classList += 'error'
            return false
        }


        return true
    }

    const onChange = (e) => {
        console.log(user)
        createUser({ ...user, [e.target.name] : e.target.value})
    }

    const onSubmit = (e) => {

        document.querySelectorAll('.error')
        .forEach((item) => {
            item.classList.remove('error')
        })

        e.preventDefault()

        console.log(user)

        let flag = false

        if (!validateEmail(user.emailid)) {
            
            let em = document.getElementsByName('emailid')[0]
            em.classList += " error"
            em.value = ""
            em.placeholder = 'Invalid Email ID, Please Check your Email ID'
            
            flag = true
            return false 
        }
        
        
        if (!validatePassword(user.password, user.cpassword)) {
            flag = true
            return false
        }
        
        
        clearForm()
        
        if (flag == false) {
        axios.post('http://localhost:8082/api/createuser', user)
        .then((res) => {
            createUser({
                username:  '', 
                emailid: '', 
                password: '',
                cpassword: '',
            })
            
            
            if (res.data == 'This username is already in use'){
                let u = document.getElementsByName('username')[0]
                u.classList += " error"
                u.value = ""
                u.placeholder = 'This username is already in use'
            }
            if (res.data == 'This Email ID is already in use') {
                let em = document.getElementsByName('emailid')[0]
                em.classList += " error"
                em.value = ""
                em.placeholder = 'This Email ID is already in use'
            }
            if (res.data == 'User Created') {
                alert('Hop On')
                navigate('/')
            }
        })
        .catch((err) => {
            console.log(err, 'Error in creating User')
        }
        )
        
        }
    }
    
    // console.log(user)
    return (
        <div className="login-container">
            <div className="image-section">
                <div className="image-up"></div>
                <div className="image-down"></div>
                <h3>So you've finally decided <br/> to get on huh-!</h3>
                <p>Let's join the party together, hip hip hurray ~ </p>
            </div>
            <div className="form-section">
                <FaBattleNet size={35} color='#5138ee'/>
                <h2>It's Connecting Time</h2>
                <p>One click for you, One giant hug from your friends</p>
                <form id="signup-form" onSubmit={onSubmit}>
                    <label htmlFor="username">Username<sup>*</sup></label>
                    <input type="text" placeholder='Log pyaar se mujhse Rahul Kehte Hei' name="username" onChange={onChange} required/>
                    <label htmlFor="email">Email<sup>*</sup></label>
                    <input type="text" placeholder='user@provider.com' name="emailid" onChange={onChange} required/>
                    <label htmlFor="password">Password<sup>*</sup></label>
                    <input type="password" placeholder="Min.8 Characters : Preferably your crush's name" name="password" onChange={onChange} required/>
                    <label htmlFor="confirm password">Confirm Password<sup>*</sup></label>
                    <input type="password" placeholder="What was that again?" name="cpassword" onChange={onChange} required/>
                    <p>Existing User ? <a href="/">Login</a></p>
                    <button>Sign Up</button>
                </form>
            </div>
        </div>
    )
    
}