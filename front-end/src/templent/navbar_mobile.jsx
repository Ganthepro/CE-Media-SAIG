import './navbar_mobile.css'

function Navbar(props) {
    function handleSignOutClick() {
        props.signOutFunc()
    }
    
    return(
        <>
            <div className='main-navbar'>
                <h4 style={{margin: '0'}}>{props.userName}</h4>
                <a href={`/profile?id=${props.userName}`}>Profile</a>
                <button onClick={() => props.openPro(true)}>Edit Profile</button>
                <a href="/upload">Upload</a>
                <button onClick={handleSignOutClick}>Sign Out</button>
            </div>
        </>
    )
}

export default Navbar