import './users.css'
import Header from '../templent/header'
import Footer from '../templent/footer'
import ShowProfile from '../templent/show-profile'
import User from './user'
import { useState } from 'preact/hooks'

export function Users() {
    const [isOpenPro,setIsOpenPro] = useState(false)
    
    return(
        <>
            {isOpenPro && <ShowProfile close={() => setIsOpenPro(false)} isEdit={false}/>}
            <Header />
            <div className='bar'>
                <p className='page-text'>Users</p>
            </div>
            <div className='contents-users'>
                {/* index % 2 == 0 ?  */}
                <User backCol={"bisque"} click={() => setIsOpenPro(true)} />
                <User backCol={"rgb(255, 219, 175)"} click={() => setIsOpenPro(true)} />
                <User backCol={"bisque"} click={() => setIsOpenPro(true)} />
                <User backCol={"rgb(255, 219, 175)"} click={() => setIsOpenPro(true)} />
                <User backCol={"rgb(255, 219, 175)"} click={() => setIsOpenPro(true)} />
                <User backCol={"rgb(255, 219, 175)"} click={() => setIsOpenPro(true)} />
                <User backCol={"rgb(255, 219, 175)"} click={() => setIsOpenPro(true)} />
                <User backCol={"rgb(255, 219, 175)"} click={() => setIsOpenPro(true)} />
                <User backCol={"rgb(255, 219, 175)"} click={() => setIsOpenPro(true)} />
                <User backCol={"rgb(255, 219, 175)"} click={() => setIsOpenPro(true)} />
                <User backCol={"rgb(255, 219, 175)"} click={() => setIsOpenPro(true)} />
            </div>
            <Footer />
        </>
    )
}
