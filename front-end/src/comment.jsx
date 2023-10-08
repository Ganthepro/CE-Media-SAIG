import './comment.css'
import userPic from "./assets/user.png";

function Comment() {
    return(
        <div className='main-comment'>
            <div className='user-comment'>
                <img src={userPic}></img>
                <h4>Gan Thepro</h4>
            </div>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem fugit labore ipsum itaque. Dignissimos nam, provident officia nostrum architecto totam harum quaerat magnam minima velit, doloremque ducimus ad quas dolores.</p>
        </div>
    )
}

export default Comment