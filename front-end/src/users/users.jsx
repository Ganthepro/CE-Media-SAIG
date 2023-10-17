import './users.css'
import Header from '../templent/header'
import Footer from '../templent/footer'
import User from './user'
import { useEffect, useState } from 'preact/hooks'

export function Users() {
    const [data,setData] = useState([])
    useEffect(async () => {
        await fetch(`http://${import.meta.env.VITE_HOST}:5500/getUsers`,{method:"GET"})
        .then(response => response.text())
        .then(fetchedData => {
            setData(JSON.parse(fetchedData))
        })
        .catch(error => {
          console.error(error);
        })
    },[])
    
    return(
        <>
            <Header />
            <div className='bar'>
                <p className='page-text'>Users</p>
            </div>
            <div className='contents-users'>
                {data.length > 0 &&
                    data.map((item, index) => {
                        if (index % 2 == 0) 
                            return <User backCol={"bisque"} click={() => setIsOpenPro(true)} data={item} />
                        else 
                            return <User backCol={"rgb(255, 219, 175)"} click={() => setIsOpenPro(true)} data={item} />
                    })
                }
            </div>
            <Footer />
        </>
    )
}
