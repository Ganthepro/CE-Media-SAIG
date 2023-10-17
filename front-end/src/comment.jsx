import './comment.css'

function Comment(props) {
    return(
        <div className='main-comment'>
            <div className='user-comment'>
                <img src={`/profilePic${props.data.profilePic}`}></img>
                <h4>{props.data.username}</h4>
            </div>
            <p>{props.data.comment}</p>
        </div>
    )
}

export default Comment