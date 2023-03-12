import './ProfileComponents.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { FaGreaterThan } from 'react-icons/fa'


export function Profilecard({username, emailid}) {
    return (
        <>
        <div className="profilecard">
            <img className="profile-image" src="" alt="" width={100} height={100}/>
            {/* <p>It's time to connect !</p> */}
            <h2>{username}</h2>
            <h4>{emailid}</h4>
        </div>
        </>
    )
}




export function SearchBar({data}) {

    const [filtered, setFilter] = useState([])
    const [requser, setProfile] = useState({})

    
    function filterupdate(e) {
        // let currentuser = sessionStorage.getItem('username')
        const searchword = e.target.value
        // console.log(searchword)

        const newfilter = data.filter((value) => {
            return value.username.toLowerCase().includes(searchword.toLowerCase())
        })

        if (searchword === "") {
            setFilter([])
        }
        else {
            setFilter(newfilter)
        }        
    }
    const [connState, setConnState] = useState('')
    
    function showuserdetails(e) {

        const requesteduser = e.target.id
        let authtoken = sessionStorage.getItem('access_token')

        axios.post('http://localhost:8082/api/getuser',{
            username : requesteduser
        },{headers: {"Authorization": `Bearer ${authtoken}`}}).then((res) => {
            setProfile(res.data)
            setFilter([])
        }
        )

        axios.post('http://localhost:8082/api/getrelation',{
            currentuser : sessionStorage.getItem('username'),
            requesteduser : requesteduser 
        },{headers: {"Authorization": `Bearer ${authtoken}`}}).then((res) => {

            let temp = ''
            if (res.data == 'no connection') {
                temp = 'Connect'
            }
            else if(res.data == 'friend req sent') {
                temp = 'Cancel Request'
            }
            else if(res.data == 'friend req recieved') {
                temp = 'Request Pending'
            }
            else if (res.data == 'friends') {
                temp = 'Unfriend'
            }
            setConnState(temp)
        }
        )

        
        
    }
    
    
    function useraction(e) {
        const requesteduser = e.target.id
        let authtoken = sessionStorage.getItem('access_token')


        if (connState == 'Connect') {

            axios.post('http://localhost:8082/api/sendfriendrequest',{
                currentuser: sessionStorage.getItem('username'),
                requesteduser: requesteduser
            },{headers: {"Authorization": `Bearer ${authtoken}`}}).then((res) => {
                console.log(res)
            }
            )

        }
        else if (connState == 'Cancel Request') {

        }

        else if (connState == 'Unfriend') {

        }

        window.location.reload()
    }


    return (

        <div className='search'>
            <div className="searchInput">
                <input type="text" placeholder='Enter username:' onChange={filterupdate}/>
            </div>    
            {filtered.length != 0 && (
                <div className="availdata">
                {filtered.map((value,key) => {
                    return <div className="searchcard" onClick={showuserdetails} id={value.username}>{value.username} </div>
                })}
            </div>
            )}
            {Object.keys(requser).length !== 0 && (
                <>
                <div className='profileview'>{requser.username}</div>
                <button id={requser.username} className={connState} onClick={useraction}>{connState}</button>
                </>
            )}
        </div>
    )
    
    
}




export function Friendrequests({friends}) {

    const navigate = useNavigate()
    function connectClick(e) {
        let requesteduser = e.target.id
        let currentuser = sessionStorage.getItem('username')
        let authtoken = sessionStorage.getItem('access_token')
        // console.log(currentuser, requesteduser)

        axios.post('http://localhost:8082/api/acceptfriendrequest',{
            currentuser : currentuser,
            requesteduser: requesteduser
        }, {headers: {"Authorization": `Bearer ${authtoken}`}}).then((res) => {
            // console.log(res)
            window.location.reload()
        })
        
    
    } 


    function declineClick(e) {
        let requesteduser = e.target.id
        let currentuser = sessionStorage.getItem('username')
        let authtoken = sessionStorage.getItem('access_token')
        // console.log(currentuser, requesteduser)

        axios.post('http://localhost:8082/api/declinefriendrequest',{
            currentuser : currentuser,
            requesteduser: requesteduser
        }, {headers: {"Authorization": `Bearer ${authtoken}`}}).then((res) => {
            // console.log(res)
            window.location.reload()
        })
        
    
    } 


    // useEffect(() => {
    //     friends.map((item, index) => {
    //         console.log(item)
    //     })
    // })

    return (
        <>

            <div className="friendrequests">
            <h3>They wanna connect with ya!</h3>
                {friends.map((item, index) => {
                    return(
                    <>
                    <div>{item.username}</div>
                    <button id={item.username} onClick={connectClick}>Connect</button>
                    <button id={item.username} onClick={declineClick}>Decline</button>
                    </> 
                    )
                })}
            </div>
        </>
    )
}