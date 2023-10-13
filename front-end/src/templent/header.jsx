import "./header.css";
import { useState, useEffect } from "preact/hooks";
import userPic from "../assets/user.png";
import CE_logoPic from "../assets/ce_logo.png";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import Navbar from "./navbar_mobile";
import Login from "./login";
import ShowProfile from "./show-profile";
import {
  GoogleAuthProvider,
  getAuth,
  onAuthStateChanged,
  signInWithRedirect,
  getRedirectResult,
  signOut,
} from "firebase/auth";

const provider = new GoogleAuthProvider();

const firebaseConfig = {
  apiKey: "AIzaSyBRKBdCUj4Paxa_bTCKLMtDoUJenMD-l74",
  authDomain: "ce-media-37da0.firebaseapp.com",
  projectId: "ce-media-37da0",
  storageBucket: "ce-media-37da0.appspot.com",
  messagingSenderId: "110411703444",
  appId: "1:110411703444:web:aa5f794e900208db4c0081",
  measurementId: "G-WS0125RYDY",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();

function Header() {
  const [isLogin, setIsLogin] = useState(false);
  const [profilePicURL, setprofilePicURL] = useState("")
  const [Username, setUsername] = useState("")
  const [isNav, setIsNav] = useState(false)
  const [isOpenLog,setIsOpenLog] = useState(false)
  const [isOpenPro,setIsOpenPro] = useState(false)
  
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLogin(true);
        try {
          setprofilePicURL(localStorage.getItem('photoURL'))
          setUsername(localStorage.getItem('username'))
        } catch(err) {
          console.error(err)
        }
        getRedirectResult(auth)
          .then((result) => {
            // This gives you a Google Access Token. You can use it to access Google APIs.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            localStorage.setItem('photoURL', user.photoURL);
            localStorage.setItem('username', user.displayName);
            // ใส่ Timestamp
            setprofilePicURL(localStorage.getItem('photoURL'))
            setUsername(localStorage.getItem('username'))
            // ...
          })
          .catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
          });
      } else {
        setIsLogin(false);
      }
    });
  }, [auth]);

  function click() {
    if (!isLogin && !isNav)
      setIsOpenLog(true)
    if (isLogin) 
      setIsNav(!isNav);
  }
  
  function googleSingIn() {
    signInWithRedirect(auth, provider);
  }
  
  function closeLog() {
    setIsOpenLog(false)
  }

  function handleSignOut() {
    signOut(auth)
      .then(() => {
        setIsNav(false)
        setIsLogin(false)
        localStorage.clear()
      })
      .catch((error) => {});
  }

  return (
    <>
      {isOpenLog && <Login closeFunc={closeLog} googleSignIn={googleSingIn} />}
      <div className="main-header">
        <a href="/" style={{color:"black"}}>
          <h1>CE Media</h1>
          <img className="ce-logo" src={CE_logoPic} alt="CE Logo" />
        </a>
        <div className="type">
          <a href="/" className="type-post">
            Post
          </a>
          <a href="/video" className="type-video">
            Video
          </a>
          <a href="/user" className="type-user">
            Users
          </a>
        </div>
        <button className="user" onClick={click}>
          <img src={!isLogin ? userPic : profilePicURL} alt="User Icon" style={{borderRadius : "50%"}}/>
          <p style={{marginTop:"0"}}>{isLogin ? "Signed In" : "Sign In/Up"}</p>
          {isNav && <Navbar signOutFunc={handleSignOut} userName={Username} openPro={setIsOpenPro}/>}
        </button>
      </div>
      {isOpenPro && <ShowProfile close={() => setIsOpenPro(false)} isEdit={false}/>}
    </>
  );
}

export default Header;
