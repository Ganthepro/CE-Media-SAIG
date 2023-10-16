import "./video.css";
import Header from "../templent/header";
import Footer from "../templent/footer";
import Card from "../card";
import { useState, useEffect } from "preact/hooks";

export function Video() {
  const [data,setData] = useState([])

  useEffect(async () => {
    await fetch('http://localhost:5500/getVideo',{method:"GET"})
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
            <p className='page-text'>Video</p>
            <button>recomment 1</button> 
            <button>recomment 2</button> 
        </div>
        <div className="contents">
          {data.length > 0 &&
            data.map((item) => {
                return <Card mode="video" data={item} />
            })
          }
        </div>
        <Footer />
      </div>
    </>
  );
}
