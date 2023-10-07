import './card.css'
import testPic from './assets/IMG_20231006_191213.jpg'
import likePic from './assets/like.png'
import commentPic from './assets/chat.png'

function Card() {
    return(
        <div className='main-card'>
           <h2 className='title-card'>Test Title</h2>
           <b className='userName'>GanThepro</b>
           <p className='description'>asdadddddddddddddddddddddddddddddddddddddalw,a;wlalwdad,ad,lwlad,;dssdfsd</p>
           <div className='pic-card'><img src={testPic} /></div>
           <div className='expression'>
                <div>
                    <img src={likePic} />
                    <p>166</p>
                </div>
                <div>
                    <img src={commentPic} />
                    <p>166</p>
                </div>
           </div>
        </div>   
    )
}

export default Card