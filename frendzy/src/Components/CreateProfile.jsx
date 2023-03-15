import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import './profileupdation.css'

export function CreateProfile() {

    const navigate = useNavigate()

    const [profileaddition, setProfileAdditions] = useState({
        'username' : sessionStorage.getItem('username'),
        'description': '',
        'dateofbirth' : '',
        'gender' : '',
        'profileurl' : ''
    })

    function onSubmit(e) {

        e.preventDefault()

        console.log('wrokkkk')
        let authtoken = sessionStorage.getItem('access_token')
        
        axios.post('http://localhost:8082/api/updateprofile', profileaddition, {headers: {"Authorization": `Bearer ${authtoken}`}}).then((res) => {
            console.log(res)
            navigate('/profile')
        })
        .catch((err) => {
            console.log(err)
        })
    }

    function onChange(e) {
        setProfileAdditions({...profileaddition, [e.target.name]: e.target.value})
        console.log(profileaddition)
    }

    return (
        <>
            <div id="profile-updation">
            <h3>Heyy Tell me more about yourself !!</h3>
            <form id="create-profile-form" onSubmit={onSubmit}>
                    <label htmlFor="profileimage">Profile Picture URL</label>
                    <input type="text" placeholder="Enter profile image source url " name="profileurl" onChange={onChange} required/>
                    <label htmlFor="description">Profile Description</label>
                    <textarea rows='6' type="text" name="description" placeholder='A short summary of who you are:' onChange={onChange} required/>
                    <label htmlFor="dateofbirth">Date of Birth</label>
                    <input type="date" name='dateofbirth' id='dateofbirth' onChange={onChange}></input>
                    <label htmlFor="gender">Gender</label>
                    <div id="gender-radio">
                        <label htmlFor="gender">Male</label>
                        <input type="radio" name="gender" onChange={onChange} id="Male" value="Male"/>
                        <label htmlFor="gender">Female</label>
                        <input type="radio" name="gender" onChange={onChange} id="Female" value='Female' />
                        <label htmlFor="gender">Other</label>
                        <input type="radio" name="gender" onChange={onChange} id="Other" value='Other' />
                    </div>
                    <button>Create Profile</button>
                </form>
            </div>
        </>
    )
}