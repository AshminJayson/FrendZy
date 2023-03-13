import './Login.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { FaBattleNet } from 'react-icons/fa'

export function Login() {

    const navigate = useNavigate()
    const [user, verifyUser] = useState({
        username: '',
        password: ''
        }
    )    

    const onChange = (e) => {
        // console.log(user)
        verifyUser({... user, [e.target.name]: e.target.value})
    }

    const onSubmit = (e) => {
        document.querySelectorAll('.error')
        .forEach((item) => {
            item.classList.remove('error')
        })

        e.preventDefault()


        axios.post('http://localhost:8082/api/verifyuser', user).then((res) => {
            // alert(res.data.loginStatus)
            if(res.data.loginStatus == "Login Successfull") {
                sessionStorage.setItem('username', res.data.username)
                sessionStorage.setItem('access_token', res.data.accessToken)
                // console.log(sessionStorage.getItem("access_token"))
                // axios.get('http://localhost:8082/api/random', ).then((res) => {
                //     console.log(res)

                // })
                navigate('/profile')
            }
            else {
                if(res.data.loginStatus == 'Login Failed : Incorrect Password') {
                    let p = document.getElementsByName('password')[0]
                    p.classList += " error"
                    p.placeholder = 'Incorrect Password'
                    p.value = ''
                }
                else {
                    let u = document.getElementsByName('username')[0]
                    u.classList += " error"
                    u.placeholder = 'Incorrect Username'
                    u.value = ''
                }
            }
        })
    }
    return (
        <div className="login-container">
            <div className="form-section">
                <div className="mini-logo"></div>
                <FaBattleNet size={35} color='#5138ee'/>
                <h2>Heyy There!</h2>
                <p>You back already?</p>
                <form id="login-form" onSubmit={onSubmit}>
                    <label htmlFor="username">Username<sup>*</sup></label>
                    <input type="text" name="username" placeholder='Think Harder!' onChange={onChange} required/>
                    <label htmlFor="password">Password<sup>*</sup></label>
                    <input type="password" name="password" placeholder="Don't tell me you forgot that!" onChange={onChange} required/>
                    <p>Still stuck alone ? <a href="/signup">Create an Account</a></p>
                    <button>Login</button>
                </form>
            </div>
            <div className="image-section">
                <div className="image-up"></div>
                <div className="image-down"></div>
                <h3>Get Closer to those <br/> who motivate you !</h3>
                <p>Who you are with, defines who you become!</p>
            </div>
        </div>
    )
    
}