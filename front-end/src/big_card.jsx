import "./big_card.css";
import likePic from "./assets/like.png";
import commentPic from "./assets/chat.png";
import closePic from "./assets/close.png";
import Comment from "./comment";
import { useEffect, useRef } from "preact/hooks";

function BigCard(props) {
  const commentInput = useRef(null)
  function closeCard() {
    props.close();
  }

  function like() {
    if (localStorage.getItem('username') != undefined || localStorage.getItem('username') != null)
      props.like(props.data.id)
    else
      alert("Please Log In.")
  }
  
  function addComment() {
    if (localStorage.getItem('username') != undefined || localStorage.getItem('username') != null)
      props.comment(props.data.id,commentInput.current.value)
    else
      alert("Please Log In.")
  }
  
  return (
    <>
      <div className="main-of-main">
        <div className="main-big-card">
          <div className="card">
            <button
              onClick={closeCard}
              style={{
                background: "white",
                border: "none",
                position: "absolute",
                top: "15px",
                left: "90%",
                cursor: "pointer",
                zIndex: "10"
              }}
            >
              <img
                src={closePic}
                style={{ width: "30px", padding: "0", margin: "0" }}
              />
            </button>
            <h2 className="title-big-card">{props.data.title}</h2>
            <b className="userName">{props.data.username}</b>
            <p className="description">{props.data.description}</p>
            <div className="pic-big-card">
              {props.mode == "pic" && <img src={`/postFolder${props.data.src}`} />}
              {props.mode == "video" && (
                <video autoplay muted loop controls id="background-video" style={{width:"100%"}}>
                  <source src={`/videoFolder${props.data.src}`} type="video/mp4" />
                </video>
              )}
            </div>
            <div className="expression">
              <button onClick={like}>
                <img src={likePic} />
                <p>{props.postData.likeNum}</p>
              </button>
              <button>
                <img src={commentPic} />
                <p>{props.postData.commentNum}</p>
              </button>
            </div>
          </div>
          <div className="comment">
            <div className="comment-form">
              <input type="text" id="name" name="name" placeholder="Comment" ref={commentInput} />
              <button onClick={addComment}>Submit</button>
            </div>
            {console.log(props.postData.comments)}
            {props.postData.comments.length > 0 &&
              props.postData.comments.map((item, index) => {
                  if (index > 0)
                    return <Comment data={item} />
              })
            }
          </div>
        </div>
      </div>
      <div className="for-blur"></div>
    </>
  );
}

export default BigCard;
