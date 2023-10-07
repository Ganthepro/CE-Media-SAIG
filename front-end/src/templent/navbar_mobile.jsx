import './navbar_mobile.css'

function Navbar(props) {
    function handleSignOutClick() {
        props.signOutFunc()
    }
    
    return(
        <div className='main-navbar'>
            <a href="https://www.google.com">Profile</a>
            <a href="https://www.google.com">Upload Picture / Video</a>
            <button onClick={handleSignOutClick}>Sign Out</button>
        </div>
    )
}

export default Navbar
