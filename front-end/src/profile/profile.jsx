import './profile.css'
import Header from '../templent/header'
import Footer from '../templent/footer'
import Card from '../card'
import { useState, useRef, useEffect } from 'preact/hooks'

export function Profile() {
    const elementRefs = Array.from({ length: 2 }, () => useRef(null));
    const queryParameters = new URLSearchParams(location.search)
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
                <p className='page-text'>{queryParameters.get('id')}</p>
                <button onClick={() => {handleElementClick(0);setMode('post')}}  ref={elementRefs[0]} key={0}>All Post</button> 
                <button onClick={() => {handleElementClick(1);setMode('video')}} ref={elementRefs[1]} key={1}>All Video</button> 
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
            </div>
            <Footer />
        </>
    )
}