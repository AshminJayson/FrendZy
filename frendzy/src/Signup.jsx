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
        if (password !== confirmpassword) {
            alert('Passwords do not match')
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
            alert('Invalid Email ID, Please Check your Email ID')
            document.getElementsByName('emailid')[0].classList += " error"
            flag = true
            return false 
        }
        
        
        if (!validatePassword(user.password, user.cpassword)) {
            document.getElementsByName('cpassword')[0].classList += " error"
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

            console.log(res.data)
            if (res.data == 'User Created') {
                alert('User successfully created')
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
            <div className="image-section"></div>
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
                    <input type="password" placeholder="Preferably your crush's name" name="password" onChange={onChange} required/>
                    <label htmlFor="confirm password">Confirm Password<sup>*</sup></label>
                    <input type="password" placeholder="What was that again?" name="cpassword" onChange={onChange} required/>
                    <p>Existing User ? <a href="/">Login</a></p>
                    <button>Sign Up</button>
                </form>
            </div>
        </div>
    )
    
}