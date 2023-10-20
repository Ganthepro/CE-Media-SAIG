import "./header.css";
import { useState, useEffect } from "preact/hooks";
import React from 'react';
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
  apiKey: import.meta.env.VITE_APIKEY,
  authDomain: import.meta.env.VITE_AUTHDOMAIN,
  projectId: import.meta.env.VITE_PRUJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGINGSENDERID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID,
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
  const [isNew,setIsNew] = useState(false)
  async function getItem() {
    await fetch(`http://${import.meta.env.VITE_HOST}:5500/getPublic/${localStorage.getItem('id')}`, {
      method: "GET",
    })
      .then(response => response.text())
      .then(fetchedData => {
          if (fetchedData !== 'User not found') {
            const data = JSON.parse(fetchedData);
            localStorage.setItem('username',data.username)
            localStorage.setItem('id',data.id)
            localStorage.setItem('photoURL',data.profilePic)
            setprofilePicURL(localStorage.getItem('photoURL'))
            setUsername(localStorage.getItem('username'))
          }
      })
      .catch(error => {
        console.error(error);
      })
  }
  
  useEffect(() => {
    getItem()
  },[isOpenPro])
  
  useEffect(async () => {
    if (isNew) {
      const data = {
        username: localStorage.getItem('username'),
        password: null,
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
    } 
    else 
      getItem()
  },[isNew])
  
  useEffect(async () => {
    await onAuthStateChanged(auth, (user) => {
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
            localStorage.setItem('username', user.displayName);
            // ใส่ Timestamp
            setUsername(localStorage.getItem('username'))
            fetch(`http://${import.meta.env.VITE_HOST}:5500/loginGoogle/${localStorage.getItem('username')}`, {
              method: "GET",
            })
            .then(response => response.text())
            .then(data => {
              console.log(data)
              if (data == 'User not found') {
                setIsNew(true) 
                localStorage.setItem('id', Date.now().toString());
                localStorage.setItem('photoURL', user.photoURL);
                setprofilePicURL(localStorage.getItem('photoURL'))
              }
              else {
                setIsNew(false)
                localStorage.setItem('id', JSON.parse(data).id)
                getItem()
              }
            })
            .catch(error => {
              console.error(error);
            });
          })
          .catch((error) => {
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
      if (localStorage.getItem('username') != '' && localStorage.getItem('username') != null) {
        setIsLogin(true)
        setUsername(localStorage.getItem('username'))
        setprofilePicURL(localStorage.getItem('photoURL'))
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

  async function handleSignOut() {
    await signOut(auth)
      .then(() => {
        setIsNav(false)
        setIsLogin(false)
        localStorage.clear()
      })
      .catch((error) => {});
    window.location.href = '/'
  }

  return (
    <>
      {isOpenLog && <Login closeFunc={closeLog} googleSignIn={googleSingIn} setisLogin={setIsLogin} setUser={setUsername} setImg={setprofilePicURL} isNew={setIsNew}/>}
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
          <img src={!isLogin ? userPic : profilePicURL != null && profilePicURL.startsWith('/') ? '/profilePic' + profilePicURL : profilePicURL} alt="User Icon" style={{borderRadius : "50%"}}/>
          <p style={{marginTop:"0"}}>{isLogin ? "Signed In" : "Sign In/Up"}</p>
          {isNav && <Navbar signOutFunc={handleSignOut} userName={Username} openPro={setIsOpenPro}/>}
        </button>
      </div>
      {isOpenPro && <ShowProfile close={() => setIsOpenPro(false)} isEdit={true} id={localStorage.getItem('id')} />}
    </>
  );
}

export default Header;