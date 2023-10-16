import './card.css'
import likePic from './assets/like.png'
import commentPic from './assets/chat.png'
import binPic from './assets/bin.png'
import BigCard from './big_card'
import { useState } from 'preact/hooks'

function Card(props) {
    const [isOpenCard, setIsOpenCard] = useState(false);
    function clicked() {
        setIsOpenCard(!isOpenCard)
    }

    return(
        <>
            <div className='main-card' onClick={clicked} style={!props.isPro && {cursor: "pointer"}}>
                <h2 className='title-card'>{props.data.title}</h2>
                <b className='userName'>{props.data.username}</b>
                <p className='description'>{props.data.description}</p>
                <div className='pic-card'>
                        {props.mode == "pic" && <img src={`/postFolder${props.data.src}`} />}
                        {props.mode == "video" &&
                            <video autoplay muted loop controls id="background-video" style={{width:"100%"}}>
                                <source src={`/videoFolder${props.data.src}`} type="video/mp4" />
                            </video>
                        }
                </div>
                <div className='expression'>
                        {!props.isPro &&
                        <>
                            <button>
                                <img src={likePic} />
                                <p>12,514</p>
                            </button>
                            <button>
                                <img src={commentPic} />
                                <p>5267</p>
                            </button>
                        </>
                        }
                        {props.isPro && 
                        <button>
                            <img src={binPic}/>
                        </button>
                        }
                </div>
            </div>   
            {isOpenCard &&
                <BigCard mode={props.mode} close={clicked} data={props.data} />
            }
        </>
    )
}

export default Card