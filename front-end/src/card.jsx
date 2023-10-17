import "./card.css";
import likePic from "./assets/like.png";
import commentPic from "./assets/chat.png";
import binPic from "./assets/bin.png";
import BigCard from "./big_card";
import { useEffect, useState } from "preact/hooks";

function Card(props) {
  const [isOpenCard, setIsOpenCard] = useState(false);
  const [postData, setPostData] = useState([]);
  function clicked() {
    setIsOpenCard(!isOpenCard);
  }
  
  async function getPostData() {
    await fetch(`http://localhost:5500/getPostData/${props.data.id}`, {
      method: "GET",
    })
      .then((response) => response.text())
      .then((fetchedData) => {
        setPostData(JSON.parse(fetchedData));
      })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(async () => {
    await getPostData()
  }, []);

  async function like(id) {
    await fetch(`http://localhost:5500/addNewLike/${id}`, {
      method: "GET",
    })
      .then((response) => response.text())
      .then((data) => {
        console.log(props.data.id);
        if (data == "Update successful") console.log("Add Successfully");
        else alert("Error");
      })
      .catch((error) => {
        console.error(error);
      });
    getPostData()
  }

  async function addComment(id, comment) {
    const data = {
        comment: comment,
        username: localStorage.getItem("username"),
        profilePic: localStorage.getItem("photoURL"),
    }
    await fetch(`http://localhost:5500/addNewComment/${id}`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.text())
      .then((data) => {
        if (data == "Update successful") console.log("Add Successfully");
        else alert("Error");
      })
      .catch((error) => {
        console.error(error);
      });
    getPostData()
  }

  return (
    <>
      <div
        className="main-card"
        onClick={clicked}
        style={!props.isPro && { cursor: "pointer" }}
      >
        <h2 className="title-card">{props.data.title}</h2>
        <b className="userName">{props.data.username}</b>
        <p className="description">{props.data.description}</p>
        <div className="pic-card">
          {props.mode == "pic" && <img src={`/postFolder${props.data.src}`} />}
          {props.mode == "video" && (
            <video
              autoplay
              muted
              loop
              controls
              id="background-video"
              style={{ width: "100%" }}
            >
              <source src={`/videoFolder${props.data.src}`} type="video/mp4" />
            </video>
          )}
        </div>
        <div className="expression">
          {!props.isPro && (
            <>
              <button>
                <img src={likePic} />
                <p>{postData.likeNum}</p>
              </button>
              <button>
                <img src={commentPic} />
                <p>{postData.commentNum}</p>
              </button>
            </>
          )}
          {props.isPro && (
            <button>
              <img src={binPic} />
            </button>
          )}
        </div>
      </div>
      {isOpenCard && (
        <BigCard
          mode={props.mode}
          close={clicked}
          data={props.data}
          postData={postData}
          like={like}
          comment={addComment}
        />
      )}
    </>
  );
}

export default Card;
