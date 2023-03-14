import './ProfileComponents.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { FaUserPlus, FaUserSlash } from 'react-icons/fa'




export function FriendCard(user) {

    const [fuser, setUser] = useState({})

    useEffect(() => {

        let requesteduser = user.user.username
        let authtoken = sessionStorage.getItem('access_token')

        axios.post('http://localhost:8082/api/getuser',{
            username : requesteduser
        },{headers: {"Authorization": `Bearer ${authtoken}`}}).then((res) => {
            setUser(res.data)
        }
        )
        
        // console.log('fuser', fuser)
    },[])

    return (
        <>
        {Object.keys(fuser).length !== 0 && (
            <>
            <div className="friendcard">
                <p>Username</p>
                <div>{fuser.username}</div>
                <p>Email ID</p>
                <div>{fuser.emailid}</div>
            </div>
            </>
        )}
        </>

    )
    
}



export function Profilecard({username, emailid}) {


    let navigate = useNavigate()

    function logOut() {

        sessionStorage.clear()
        navigate('/')    
        
    }
    return (
        <>
        <div className="profilecard">
            <img className="profile-image" src="" alt="" width={120} height={120}/>
            {/* <p>It's time to connect !</p> */}
            <h2>{username}</h2>
            <h4>{emailid}</h4>
            <button id='Logout' onClick={logOut}>Logout</button>
        </div>
        </>
    )
}




export function SearchBar({data}) {

    const [filtered, setFilter] = useState([])
    
    
    
    
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
    
    
    const [requser, setProfile] = useState({})
    const [connState, setConnState] = useState('')
    const [mutualfriends, setMutualFriends] = useState([])
    
    function showuserdetails(e) {

        const requesteduser = e.target.id
        let authtoken = sessionStorage.getItem('access_token')

        axios.post('http://localhost:8082/api/getuser',{
            username : requesteduser
        },{headers: {"Authorization": `Bearer ${authtoken}`}}).then((res) => {
            setProfile(res.data)
            setFilter([])
            setMutualFriends([])
        }
        )


        axios.post('http://localhost:8082/api/getmutualfriends',{
            currentuser: sessionStorage.getItem('username'),
            requesteduser: requesteduser
        },{headers: {"Authorization": `Bearer ${authtoken}`}}).then((res) => {
            setMutualFriends(res.data)
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

            axios.post('http://localhost:8082/api/cancelfriendrequest',{
                currentuser: sessionStorage.getItem('username'),
                requesteduser: requesteduser
            },{headers: {"Authorization": `Bearer ${authtoken}`}}).then((res) => {
                console.log(res)
            }
            )

        }

        else if (connState == 'Unfriend') {

            axios.post('http://localhost:8082/api/unfrienduser',{
                currentuser: sessionStorage.getItem('username'),
                requesteduser: requesteduser
            },{headers: {"Authorization": `Bearer ${authtoken}`}}).then((res) => {
                console.log(res)
            }
            )

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
                {filtered.map((value) => {
                    return <div className="searchcard" onClick={showuserdetails} id={value.username}>{value.username} </div>
                })}
                </div>
            )}
            {Object.keys(requser).length !== 0 && (
                
                <div className="profileview">
                    <h4>Username</h4>
                    <div>{requser.username}</div>
                    <h4>Email ID</h4>
                    <div>{requser.emailid}</div>
                    <button id={requser.username} className={connState} onClick={useraction}>{connState}</button>
                    <h3>Mutual Friends</h3>
                    <div className="mutualfriends"></div>
                    {mutualfriends.map((friend) => {
                        return <FriendCard user={friend}/>
                    })}
                    <h3>Friends</h3>
                    <div className="friends">
                    {requser.friends.map((friend) => {
                        return <FriendCard user={friend}/>
                    })}
                    </div>
                </div>

            )}
        </div>
    )
    
    
}




export function Friendrequests({friends}) {

    
    function connectClick(e) {

        let requesteduser = e.currentTarget.id
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
        let requesteduser = e.currentTarget.id
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

    return (
        <>

            <div className="friendrequests">
            <h3>They wanna connect with ya!</h3>
            <hr />
                {friends.map((item) => {
                    return(
                    <>
                    <div className="friendrequest">
                        <h3>{item.username}</h3>
                        <h3>{item.emailid}</h3>
                        <div  className='button accept' id={item.username} onClick={connectClick}><FaUserPlus id={item.username} size={30} color='white'/></div>
                        <div  className='button reject' id={item.username} onClick={declineClick}><FaUserSlash size={30}/></div>
                    </div>
                    </> 
                    )
                })}
            </div>
        </>
    )
}




export function Friendslist(friends) {
    return (
        <>
        <div className="friendslist">
        <h3>Your Friends</h3>
        <hr />
            {friends.friends.map((user) => {
                {/* console.log(user) */}
                return <FriendCard user={user} />
            })}
        </div>
        </>
    )
}