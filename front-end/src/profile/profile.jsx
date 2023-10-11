import './profile.css'
import Header from '../templent/header'
import Footer from '../templent/footer'
import { useState } from 'preact/hooks'
import Card from '../card'

export function Profile() {
    const [isPost,setIsPost] = useState(true)
    function toPost() {
        setIsPost(true)
    }
    
    function toVideo() {
        setIsPost(false)
    }
    
    const notIsStyle = {
        backgroundColor: "white",
        border: "3px solid orange",
    }
    const isStyle = {
        backgroundColor: "orange",
        color: "white"
    }
    
    return(
        <>
            <Header />
            <div className='bar'>
                <p className='page-text'>Profile</p>
                <button onClick={toPost} style={isPost ? isStyle : notIsStyle}>My Post</button> 
                <button onClick={toVideo} style={!isPost ? isStyle : notIsStyle}>My Video</button> 
            </div>
            <div className='contents'>
                {console.log(isPost)}
                {isPost &&
                <>
                    <Card mode="pic" isPro={true}/>
                    <Card mode="pic" isPro={true}/>
                    <Card mode="pic" isPro={true}/>
                    <Card mode="pic" isPro={true}/>
                    <Card mode="pic" isPro={true}/>
                    <Card mode="pic" isPro={true}/>
                </> 
                }
                {!isPost &&
                <>
                    <Card mode="video" isPro={true}/>
                    <Card mode="video" isPro={true}/>
                    <Card mode="video" isPro={true}/>
                    <Card mode="video" isPro={true}/>
                    <Card mode="video" isPro={true}/>
                    <Card mode="video" isPro={true}/>
                </>
                }
            </div>
            <Footer />
        </>
    )
}