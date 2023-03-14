import './Profile.css'
import { useState } from "react";
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Profilecard, Friendrequests, SearchBar, Friendslist } from './ProfileComponents';




export function Profile() {
    
    const [user, setUser] = useState({
        username: '',
        emailid: ''
    })
    let navigate = useNavigate()

    const [friendrequests, setFriendsRequests] = useState([])
    const [friends, setFriends] = useState([])
    const [allUsers, setAllUsers] = useState([])

    useEffect(() => {


        let username = sessionStorage.getItem('username')
        let authtoken = sessionStorage.getItem('access_token')

        if (!authtoken) {
            alert('Invalid Login')
            navigate('/')
        }
        
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
            (({data: user}) => {
                setFriendsRequests(user)
            })
        )


        axios.post('http://localhost:8082/api/getfriends',{
            username : username
        },{headers: {"Authorization": `Bearer ${authtoken}`}}).then((res) => {
                setFriends(res.data)
            })
                



        
        axios.post('http://localhost:8082/api/getallusers').then((res) => {
            // console.log(res)
            let x = res.data
            // console.log(x)
            for (let user of x) {
                if (user.username == sessionStorage.getItem('username')) {
                    // console.log(x.indexOf(user))
                    x.splice(x.indexOf(user), 1)
                }
            }
            // console.log(x)
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
                    <Friendrequests friends={friendrequests}/>
                    <Friendslist friends={friends}/>
                </div>
            </div>
        </>
    )
    
}