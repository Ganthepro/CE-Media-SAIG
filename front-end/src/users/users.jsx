import './users.css'
import Header from '../templent/header'
import Footer from '../templent/footer'
import User from './user'

export function Users() {
    return(
        <>
            <Header />
            <div className='bar'>
                <p className='page-text'>Users</p>
            </div>
            <div className='contents'>
                {/* index % 2 == 0 ?  */}
                <User backCol={"bisque"}/>
                <User backCol={"rgb(255, 219, 175)"}/>
                <User backCol={"bisque"}/>
                <User backCol={"rgb(255, 219, 175)"}/>
                <User backCol={"rgb(255, 219, 175)"}/>
                <User backCol={"rgb(255, 219, 175)"}/>
                <User backCol={"rgb(255, 219, 175)"}/>
                {/* <User backCol={"rgb(255, 219, 175)"}/>
                <User backCol={"rgb(255, 219, 175)"}/>
                <User backCol={"rgb(255, 219, 175)"}/>
                <User backCol={"rgb(255, 219, 175)"}/>
                <User backCol={"rgb(255, 219, 175)"}/>
                <User backCol={"rgb(255, 219, 175)"}/> */}
            </div>
            <div className='push-footer'></div>
            <Footer />
        </>
    )
}
