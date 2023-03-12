import './Profile.css'
import { useState } from "react";
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Profilecard, Friendrequests, SearchBar } from './ProfileComponents';




export function Profile() {
    
    const [user, setUser] = useState({
        username: '',
        emailid: ''
    })

    const [friends, setFriends] = useState([])
    const [allUsers, setAllUsers] = useState([])

    useEffect(() => {
        let username = sessionStorage.getItem('username')
        let authtoken = sessionStorage.getItem('access_token')

        
        axios.post('http://localhost:8082/api/getuser',{
            username : username
        },{headers: {"Authorization": `Bearer ${authtoken}`}}).then((res) => {
            // console.log('whyyy')
            setUser({
                username: res.data.username,
                emailid: res.data.emailid
            })
            
        })
        

        axios.post('http://localhost:8082/api/getfriendrequests',{
            username : username
        },{headers: {"Authorization": `Bearer ${authtoken}`}}).then((res) => res).then(
            (({data: username}) => {
                setFriends(username)
            })
        )
        
        axios.post('http://localhost:8082/api/getallusers').then((res) => {
            // console.log(res)
            setAllUsers(res.data)
            // console.log('allusers', allUsers)
        }
        )
        
        
    }, [])
    
    

    
    return (
        <>
            <div className="profile-section">
                <div className='current-user-details'>
                    <Profilecard emailid={user.emailid} username={user.username}/>
                </div>
                <div className='requested-user-details'>
                    <SearchBar data={allUsers}/>
                </div>
                <div className='notificationandfriendlist'>
                    <Friendrequests friends={friends}/>
                </div>
            </div>
        </>
    )
    
}