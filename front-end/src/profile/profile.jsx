import './profile.css'
import Header from '../templent/header'
import Footer from '../templent/footer'
import Card from '../card'
import { useState, useRef, useEffect } from 'preact/hooks'

export function Profile() {
    const elementRefs = Array.from({ length: 2 }, () => useRef(null));
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
      useEffect(() => {handleElementClick(0)},[])
    return(
        <>
            <Header />
            <div className='bar'>
                <p className='page-text'>Profile</p>
                <button onClick={() => {handleElementClick(0);setMode('post')}}  ref={elementRefs[0]} key={0}>My Post</button> 
                <button onClick={() => {handleElementClick(1);setMode('video')}} ref={elementRefs[1]} key={1}>My Video</button> 
            </div>
            <div className='contents'>
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
                    <div className='photo-edit'>
                        <img src={localStorage.getItem('photoURL')} alt="profilePic" />
                        <b style={{paddingLeft:"10px"}}>{localStorage.getItem('username')}<br /><p style={{margin:"0",fontWeight:"normal",cursor:"pointer"}}>Change Profile</p></b>
                    </div>
                    <div>
                        <b>Description</b>
                        <p>Description</p>
                    </div>
                </div>
                }
            </div>
            <Footer />
        </>
    )
}