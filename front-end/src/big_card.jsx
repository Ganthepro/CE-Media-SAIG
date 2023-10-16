import "./big_card.css";
import testVideo from "./assets/VID_20231005_211503.mp4";
import likePic from "./assets/like.png";
import commentPic from "./assets/chat.png";
import closePic from "./assets/close.png";
import Comment from "./comment";

function BigCard(props) {
  function closeCard() {
    console.log("close")
    props.close();
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
              <button>
                <img src={likePic} />
                <p>12,514</p>
              </button>
              <button>
                <img src={commentPic} />
                <p>5267</p>
              </button>
            </div>
          </div>
          <div className="comment">
            <form action="submit_action.php" method="POST" className="comment-form">
              <input type="text" id="name" name="name" placeholder="Comment" />
              <input type="submit" value="Submit" />
            </form>
            <Comment />
            <Comment />
            <Comment />
          </div>
        </div>
      </div>
      <div className="for-blur"></div>
    </>
  );
}

export default BigCard;
