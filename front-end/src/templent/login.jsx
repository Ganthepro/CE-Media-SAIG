import './login.css'
import googlePic from '../assets/google.png'
import closePic from '../assets/close.png'
import { useRef } from 'preact/hooks'

function Login(props) {
    const userInput = useRef(null)
    const passInput = useRef(null)
    function close() {
        props.closeFunc()
    }
    
    function googleIn() {
        props.googleSignIn()
    }
    
    function signIn() {
        if (userInput.current.value.length == 0 || passInput.current.value.length == 0) {
            alert("Username or Password is Nothing")
            return
        }
        fetch(`http://${import.meta.env.VITE_HOST}:5500/login/${userInput.current.value}/${passInput.current.value}`, {
          method: "GET",
        })
        .then(response => response.text())
        .then(data => {
            if (data != 'User not found') {
                localStorage.setItem('id', JSON.parse(data).id);
                localStorage.setItem('photoURL',JSON.parse(data).profilePic)
                localStorage.setItem('username',JSON.parse(data).username)
                props.setisLogin(true)
                props.setUser(localStorage.getItem('username'))
                props.setImg(localStorage.getItem('photoURL'))
                alert("Sign In Successful")
            } 
            else 
                alert("Username or Password is not correct")
        })
        close()
    }
    function signUp() {
        const userValue = userInput.current.value
        const passValue = passInput.current.value
        if (userInput.current.value.lenght == 0 || passInput.current.value.value == 0) {
            alert("Username or Password is Nothing")
            return
        }
        if (passInput.current.value.length < 8) {
            alert("Password length must more than 8")
            return
        }
        fetch(`http://${import.meta.env.VITE_HOST}:5500/getPublic/${userValue}`, {
          method: "GET"
        })
        .then(response => response.text())
        .then(async data => {
            if (data == 'User not found') {
                localStorage.setItem('id', Date.now().toString());
                localStorage.setItem('photoURL','/user.png')
                localStorage.setItem('username',userValue)
                props.setisLogin(true)
                props.setUser(localStorage.getItem('username'))
                props.setImg(localStorage.getItem('photoURL'))
                const data = {
                  username: localStorage.getItem('username'),
                  password: passValue,
                  id: localStorage.getItem('id'),
                  profilePic: localStorage.getItem('photoURL'),
                }
                await fetch(`http://${import.meta.env.VITE_HOST}:5500/newUser`, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(data),
                })
                .then(response => {
                  if (!response.ok) 
                    throw new Error('Failed to fetch data');
                })
                alert("Sign Up Successful")
            }
            else 
                alert("Username is already used")
        })
        close()
    }

    return(
        <>
            <div className='main-login'>
                <h3 className='h3-login'>Log In</h3>
                <a onClick={close} className="close-but" style={{position: "absolute",right:"15px",top:"10px"}}><img src={closePic} /></a>
                <div className='sub-login'>
                    <div className='login-form'>
                        <label htmlFor="username-input">Username</label>
                        <input type="text" id="username-input" name="username-input" placeholder="Username" className='input-form' ref={userInput}/>
                        <label htmlFor="password-input">Password</label>
                        <input type="password" id="password-input" name="password-input" placeholder="Password" className='input-form' ref={passInput}/>
                    </div>
                    <div className='submit'>
                        <button style={{background:"gray",border:"none",borderRadius:"20px",color:"white",height:"30px"}} onClick={signIn}>Sign In</button>
                        <button style={{background:"orange",border:"none",borderRadius:"20px",color:"white",height:"30px"}} onClick={signUp}>Sign up</button>
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