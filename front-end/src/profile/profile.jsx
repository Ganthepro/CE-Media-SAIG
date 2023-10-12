import './profile.css'
import Header from '../templent/header'
import Footer from '../templent/footer'
import Card from '../card'
import { useState, useRef } from 'preact/hooks'

export function Profile() {
    const [isPost,setIsPost] = useState(true)
    const elementRefs = Array.from({ length: 3 }, () => useRef(null));
    const [mode, setMode] = useState('post')
    const handleElementClick = (clickedIndex) => {
        elementRefs.forEach((ref, index) => {
          if (index === clickedIndex) {
            ref.current.style.backgroundColor = 'orange';
            ref.current.style.color = 'white';
          } else {
            ref.current.style.backgroundColor = 'white';
            ref.current.style.border = '3px solid orange';
            ref.current.style.color = 'black'
          }
        });
      };
      
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
                <button onClick={() => {handleElementClick(0);setMode('post')}}  ref={elementRefs[0]} key={0}>My Post</button> 
                <button onClick={() => {handleElementClick(1);setMode('video')}} ref={elementRefs[1]} key={1}>My Video</button> 
                <button onClick={() => {handleElementClick(2);setMode('user')}} ref={elementRefs[2]} key={2}>Edit Profile</button>
            </div>
            <div className='contents'>
                {console.log(isPost)}
                {mode == 'post' &&
                <>
                    <Card mode="pic" isPro={true}/>
                    <Card mode="pic" isPro={true}/>
                    <Card mode="pic" isPro={true}/>
                    <Card mode="pic" isPro={true}/>
                    <Card mode="pic" isPro={true}/>
                    <Card mode="pic" isPro={true}/>
                </>
                }
                {mode == 'video' &&
                <>
                    <Card mode="video" isPro={true}/>
                    <Card mode="video" isPro={true}/>
                    <Card mode="video" isPro={true}/>
                    <Card mode="video" isPro={true}/>
                    <Card mode="video" isPro={true}/>
                    <Card mode="video" isPro={true}/>
                </>
                }
                {mode == 'user' &&
                <div className='user-edit'>
                    
                </div>
                }
            </div>
            <Footer />
        </>
    )
}