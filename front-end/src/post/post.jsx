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
        <div className='contents'>
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
