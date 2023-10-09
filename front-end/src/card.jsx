import './card.css'
import testPic from './assets/IMG_20231006_191213.jpg'
import testVideo from './assets/VID_20231005_211503.mp4'
import likePic from './assets/like.png'
import commentPic from './assets/chat.png'

function Card(props) {
    function openCard() {
        props.open()
    }
    
    return(
        <div className='main-card' onClick={openCard}>
           <h2 className='title-card'>Title</h2>
           <b className='userName'>Username</b>
           <p className='description'>ตัวพี่ชอบกินตับหวาน ส่วนตัวน้องนั้นชอบทานตำไทย ตำมั่ว ตำซั่ว ตำแตง จะมัวออกแรง นั่งตำทำไม</p>
           <div className='pic-card'>
                {props.mode == "pic" &&<img src={testPic} />}
                {props.mode == "video" &&
                    <video autoplay muted loop controls id="background-video">
                        <source src={testVideo} type="video/mp4" />
                    </video>
                }
           </div>
           <div className='expression'>
                <div>
                    <img src={likePic} />
                    <p>12,514</p>
                </div>
                <div>
                    <img src={commentPic} />
                    <p>5267</p>
                </div>
           </div>
        </div>   
    )
}

export default Card