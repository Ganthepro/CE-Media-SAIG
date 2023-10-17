import './user.css'
import ShowProfile from '../templent/show-profile'
import { useState } from 'preact/hooks'

function User(props) {
    const [isOpenPro,setIsOpenPro] = useState(false)
    function clicked() {
        setIsOpenPro(true)
    }
    
    return(
        <>
            {isOpenPro && <ShowProfile close={() => setIsOpenPro(false)} isEdit={false} id={props.data.id} />}
            <div className='main-user' style={{background:props.backCol}} onClick={clicked}>
                <div className='sub-main'>
                    <img src={props.data.profilePic != null && props.data.profilePic.startsWith('/') ? '/profilePic' + props.data.profilePic : props.data.profilePic} />
                    <h2>{props.data.username}</h2>
                </div>
            </div>
        </>
    )
}

export default User