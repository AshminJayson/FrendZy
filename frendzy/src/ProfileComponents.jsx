import './ProfileComponents.css'

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


export function Friendrequests({}) {
    return (
        <>
            <div className="friendrequests">
                heyyyy
            </div>
        </>
    )
}