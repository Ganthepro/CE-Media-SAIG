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
    
    return(
        <>
            <Header />
            <div className='bar'>
                <p className='page-text'>Profile</p>
                <button onClick={toPost}>My Post</button> 
                <button onClick={toVideo}>My Video</button> 
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