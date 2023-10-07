import "./header.css";
import { useState } from "preact/hooks";
import userPic from "../assets/user.png";
import CE_logoPic from "../assets/ce_logo.png";
import Navbar from "./navbar_mobile";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
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
  const [isNav, setIsNav] = useState(false);

  function click() {
    if (isLogin && isNav) {
    } else if (isLogin) {
      setIsNav(!isNav);
    } else if (!isNav) {
      signInWithPopup(auth, provider)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          // The signed-in user info.
          const user = result.user;
          setIsLogin(true)
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
    }
  }

  function handleSignOut() {
    signOut(auth)
      .then(() => {
        setIsNav(false);
        setIsLogin(false);
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
        <a href="#" className="type-post">โพสต์</a>
        <a href="https://www.google.com" className="type-video">วิดีโอ</a>
      </div>
      <button className="user" onClick={click}>
        <img src={userPic} alt="User Icon" />
        <p>{isLogin ? "Signed In" : "Sign In/Up"}</p>
        {isNav && <Navbar signOutFunc={handleSignOut} />}
      </button>
    </div>
  );
}

export default Header;
