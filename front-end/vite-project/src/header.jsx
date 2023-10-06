import "./header.css"
import { useState } from "preact/hooks"
import userPic from './assets/user.png'
import CE_logoPic from './assets/ce_logo.png'

function Header() {
    const [isLogin, setIsLogin] = useState(false)
    return(
        <div className="main-header">
            <h1>CE Media</h1>
            <img className="ce-logo" src={CE_logoPic}></img>
            <div className="type">
                <a href="www.google.com" className="type-post">โพสต์</a>
                <a href="www.google.com" className="type-video">วิดีโอ</a>
            </div>
            <div className="user">
                <img src={userPic}></img>
                <p>{isLogin ? "ลงชื่อเข้าใช้งานแล้ว" : "ลงชื่อใช้งาน"}</p>
            </div>
        </div>
    )
}

export default Header