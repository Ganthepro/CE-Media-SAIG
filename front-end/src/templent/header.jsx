import "./header.css";
import { useState, useEffect } from "preact/hooks";
import userPic from "../assets/user.png";
import CE_logoPic from "../assets/ce_logo.png";
import Navbar from "./navbar_mobile";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
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
  const [isNav, setIsNav] = useState(false);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLogin(true);
        try {
          setprofilePicURL(localStorage.getItem('photoURL'))
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
            setprofilePicURL(localStorage.getItem('photoURL'))
            console.log(user.email);
            // IdP data available using getAdditionalUserInfo(result)
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
    if (isLogin && isNav) {
    } 
    if (isLogin) {
      setIsNav(!isNav);
    } else if (!isNav) {
      signInWithRedirect(auth, provider);
    }
  }

  function handleSignOut() {
    signOut(auth)
      .then(() => {
        setIsNav(false)
        setIsLogin(false)
        localStorage.clear()
      })
      .catch((error) => {
        // An error happened.
      });
  }

  return (
    <div className="main-header">
      <h1>CE Media</h1>
      <img className="ce-logo" src={CE_logoPic} alt="CE Logo" />
      <div className="type">
        <a href="#" className="type-post">
          โพสต์
        </a>
        <a href="https://www.google.com" className="type-video">
          วิดีโอ
        </a>
      </div>
      <button className="user" onClick={click}>
        <img src={!isLogin ? userPic : profilePicURL} alt="User Icon" style={{borderRadius : "50%"}}/>
        <p>{isLogin ? "Signed In" : "Sign In/Up"}</p>
        {isNav && <Navbar signOutFunc={handleSignOut} />}
      </button>
    </div>
  );
}

export default Header;
