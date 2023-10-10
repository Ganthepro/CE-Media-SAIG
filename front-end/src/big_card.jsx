import "./big_card.css";
import testPic from "./assets/IMG_20231006_191213.jpg";
import testVideo from "./assets/VID_20231005_211503.mp4";
import likePic from "./assets/like.png";
import commentPic from "./assets/chat.png";
import closePic from "./assets/close.png";
import Comment from "./comment";

function BigCard(props) {
  function openCard() {
    props.open();
  }

  return (
    <div className="main-of-main">
      <div className="main-big-card">
        <div className="card">
          <button
            onClick={openCard}
            style={{
              background: "white",
              border: "none",
              position: "absolute",
              top: "15px",
              left: "90%",
              cursor: "pointer",
            }}
          >
            <img
              src={closePic}
              style={{ width: "30px", padding: "0", margin: "0" }}
            />
          </button>
          <h2 className="title-big-card">Title</h2>
          <b className="userName">Username</b>
          <p className="description">
            ตัวพี่ชอบกินตับหวาน ส่วนตัวน้องนั้นชอบทานตำไทย ตำมั่ว ตำซั่ว ตำแตง
            จะมัวออกแรง นั่งตำทำไม
          </p>
          <div className="pic-big-card">
            {props.mode == "pic" && <img src={testPic} />}
            {props.mode == "video" && (
              <video autoplay muted loop controls id="background-video">
                <source src={testVideo} type="video/mp4" />
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
          <form action="submit_action.php" method="POST">
            <input type="text" id="name" name="name" placeholder="Comment" />
            <input type="submit" value="Submit" />
          </form>
          <Comment />
          <Comment />
        </div>
      </div>
    </div>
  );
}

export default BigCard;
