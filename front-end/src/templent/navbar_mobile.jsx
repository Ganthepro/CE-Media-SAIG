import './navbar_mobile.css'
import { useState } from 'preact/hooks'

function Navbar(props) {
    function handleSignOutClick() {
        props.signOutFunc()
    }
    
    return(
        <>
            <div className='main-navbar'>
                <h4>{props.userName}</h4>
                <a href={`/profile?id=${props.userName}`}>Profile</a>
                <button onClick={() => props.openPro(true)}>Edit Profile</button>
                <a href="https://www.google.com">Post</a>
                <button onClick={handleSignOutClick}>Sign Out</button>
            </div>
            {/* {console.log(isOpenEdit)} */}
        </>
    )
}

export default Navbar