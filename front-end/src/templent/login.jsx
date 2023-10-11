import './login.css'
import googlePic from '../assets/google.png'
import closePic from '../assets/close.png'

function Login(props) {
    function close() {
        props.closeFunc()
    }
    
    function googleIn() {
        props.googleSignIn()
    }
    
    return(
        <>
            <div className='main-login'>
                <h3 className='h3-login'>Sign In/Up</h3>
                <a onClick={close} className="close-but" style={{position: "absolute",right:"15px",top:"10px"}}><img src={closePic} /></a>
                <div className='sub-login'>
                    <div className='login-form'>
                        <label htmlFor="username-input">Username</label>
                        <input type="text" id="username-input" name="username-input" placeholder="Username" className='input-form'/>
                        <label htmlFor="password-input">Password</label>
                        <input type="password" id="password-input" name="password-input" placeholder="Password" className='input-form' />
                    </div>
                    <div className='submit'>
                        <button style={{background:"gray",border:"none",borderRadius:"20px",color:"white",height:"30px"}}>Sign In</button>
                        <button style={{background:"orange",border:"none",borderRadius:"20px",color:"white",height:"30px"}}>Sign up</button>
                    </div>
                    <p>or</p>
                    <img src={googlePic} className='google-login' onClick={googleIn} style={{cursor:"pointer"}}/>
                </div>
            </div>
            <div className='for-blur'></div>
        </>
    )
}

export default Login