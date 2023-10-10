import './profile.css'
import Header from '../templent/header'
import Footer from '../templent/footer'
import { useState } from 'preact/hooks'
import Card from '../card'

export function Profile() {
    const [isPost,setIsPost] = useState(true)
    function changeView() {
        setIsPost(!isPost)
    }
    
    return(
        <>
            <Header />
            <div className='bar'>
                <p className='page-text'>Profile</p>
                <button>My Post</button> 
                <button>My Video</button> 
            </div>
            <div className='contents'>
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