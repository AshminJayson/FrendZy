import './Profile.css'
import { useState } from "react";
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Profilecard, Friendrequests } from './ProfileComponents';


export function Profile() {
    
    const [user, setUser] = useState({
        username: '',
        emailid: ''
    })


    useEffect(() => {
        let username = sessionStorage.getItem('username')
        let authtoken = sessionStorage.getItem('access_token')

        axios.post('http://localhost:8082/api/getuser',{
            username : username
        },{headers: {"Authorization": `Bearer ${sessionStorage.getItem("access_token")}`}}).then((res) => {
            // console.log('whyyy')
            setUser({
                username: res.data.username,
                emailid: res.data.emailid
            })

        })
    }, [])
    
    
    return (
        <>
            <div className="profile-section">
                <div className='current-user-details'>
                    <Profilecard emailid={user.emailid} username={user.username}/>
                </div>
                <div className='requested-user-details'></div>
                <div className='notificationandfriendlist'>
                    <Friendrequests />
                </div>
            </div>
        </>
    )
    
}