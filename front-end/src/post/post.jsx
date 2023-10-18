import './post.css';
import Header from '../templent/header';
import Footer from '../templent/footer';
import Card from '../card';
import { useEffect, useState } from 'preact/hooks';

export function Post() {
  const [data,setData] = useState([])
  
  useEffect(async () => {
    await fetch(`http://${import.meta.env.VITE_HOST}:5500/getPost`,{method:"GET"})
    .then(response => response.text())
    .then(fetchedData => {
        setData(JSON.parse(fetchedData))
    })
    .catch(error => {
      console.error(error);
    })
  },[])
  
  return (
    <>
      <div>
        <Header />
        <div className='bar'>
            <p className='page-text'>Post</p>
        </div>
        <div className='contents' style={data.length <= 3 ? {height: "calc(100vh - 80px - 10px - 70px)",display: "flex", justifyContent:"space-around",alignItems:"center",} : {}}>
          {data.length == 0 &&
            <h2 style={{display: "flex", justifyContent:"center",alignItems:"center",fontSize:"50px"}}>No Post</h2>
          }
          {data.length > 0 &&
            data.map((item) => {
              return <Card mode="pic" data={item} />
            })
          }
        </div>
        <Footer />
      </div>
    </>
  )
}
