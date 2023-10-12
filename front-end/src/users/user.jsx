import './user.css'

function User(props) {
    return(
        <div className='main-user' style={{background:props.backCol}}>
            <div className='sub-main'>
                <img src={localStorage.getItem('photoURL')}/>
                <h2>{localStorage.getItem('username')}</h2>
            </div>
        </div>   
    )
}

export default User