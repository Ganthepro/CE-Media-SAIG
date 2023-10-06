import './card.css'
import testPic from './assets/IMG_20231006_191213.jpg'
import likePic from './assets/like.png'
import commentPic from './assets/chat.png'

function Card() {
    return(
        <div className='main-card'>
           <h2 className='title-card'>Test Title</h2>
           <b className='userName'>GanThepro</b>
           <p className='description'>asdadddddddddddddddddddddddddddddddddddddalw,a;wlalwdad,ad,lwlad,;a,lw,a,;ddwa</p>
           <div className='pic-card'><img src={testPic} /></div>
           <div className='expression'>
                <img src={likePic} />
                <img src={commentPic} />
           </div>
        </div>   
    )
}

export default Card