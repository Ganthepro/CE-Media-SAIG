import './profile.css'
import Header from '../templent/header'
import Footer from '../templent/footer'
import Card from '../card'
import { useState, useRef, useEffect } from 'preact/hooks'

export function Profile() {
    const elementRefs = Array.from({ length: 2 }, () => useRef(null));
    const queryParameters = new URLSearchParams(location.search)
    const [mode, setMode] = useState('post')
    const [data, setData] = useState([])
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
    
    useEffect(async () => {
      getUserPost()
    },[mode])
    
    async function getUserPost() {
      await fetch(`http://${import.meta.env.VITE_HOST}:5500/${mode == 'post' ? "getUserPost" : "getUserVideo"}/${queryParameters.get('id')}`,{method:"GET"})
        .then(response => response.text())
        .then(fetchedData => {
            setData(JSON.parse(fetchedData))
            console.log(JSON.parse(fetchedData))
        })
        .catch(error => {
          console.error(error);
        })
    }
    
    async function deletePost(id) {
      const data = {id: id}
      await fetch(`http://${import.meta.env.VITE_HOST}:5500/${mode == 'post' ? "deletePost" : "deleteVideo"}`,{
        method:"DELETE",
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(response => response.text())
        .then(fetchedData => {
            console.log(fetchedData)
        })
        .catch(error => {
          console.error(error);
        })
        getUserPost()
    }
    
    return(
        <>
            <Header />
            <div className='bar'>
                <p className='page-text'>{queryParameters.get('id')}</p>
                <button onClick={() => {handleElementClick(0);setMode('post')}}  ref={elementRefs[0]} key={0}>All Post</button> 
                <button onClick={() => {handleElementClick(1);setMode('video')}} ref={elementRefs[1]} key={1}>All Video</button> 
            </div>
              <div className='contents' style={data.length <= 3 ? {height: "calc(100vh - 80px - 10px - 70px)",display: "flex", justifyContent:"space-around",alignItems:"center",} : {}}>
                {data.length == 0 &&
                  <h2 style={{fontSize:"50px"}}>{mode == "post" ? "No Post" : "No Video"}</h2>
                }
                {mode == 'post' && data.length > 0 &&
                  data.map((item) => {
                      return <Card mode="pic" data={item} isPro={queryParameters.get('id') == localStorage.getItem('username') ? true : false} deleteFunc={deletePost} />
                  })
                }
                {mode == 'video' && data.length > 0 &&
                  data.map((item) => {
                      return <Card mode="video" data={item} isPro={queryParameters.get('id') == localStorage.getItem('username') ? true : false} deleteFunc={deletePost} />
                  })
                }
            </div>
            <Footer />
        </>
    )
}