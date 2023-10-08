import './navbar_mobile.css'

function Navbar(props) {
    function handleSignOutClick() {
        props.signOutFunc()
    }
    
    return(
        <div className='main-navbar'>
            <h4>{props.userName}</h4>
            <a href="https://www.google.com">Profile</a>
            <a href="https://www.google.com">Post</a>
            <button onClick={handleSignOutClick}>Sign Out</button>
        </div>
    )
}

export default Navbar