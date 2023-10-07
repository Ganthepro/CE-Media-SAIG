import "./header.css";
import { useState } from "preact/hooks";
import userPic from '../assets/user.png';
import CE_logoPic from '../assets/ce_logo.png';
import Navbar from "./navbar_mobile";

function Header() {
    const [isLogin, setIsLogin] = useState(true);
    const [isNav, setIsNav] = useState(false);
    
    function click() {
        if (isLogin) {
            setIsNav(!isNav);
            console.log(isNav)
        }
    }
    
    return (
        <div className="main-header">
            <h1>CE Media</h1>
            <img className="ce-logo" src={CE_logoPic} alt="CE Logo" />
            <div className="type">
                <a href="https://www.google.com" className="type-post">โพสต์</a>
                <a href="https://www.google.com" className="type-video">วิดีโอ</a>
            </div>
            <button className="user" onClick={click}>
                <img src={userPic} alt="User Icon" />
                <p>{isLogin ? "Signed In" : "Sign In/Up"}</p>
                {isNav && <Navbar />}
            </button>
        </div>
    );
}

export default Header;
