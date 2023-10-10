import "./video.css";
import Header from "../templent/header";
import Footer from "../templent/footer";
import Card from "../card";
import BigCard from "../big_card";
import { useState } from "preact/hooks";

export function Video() {
  const [isOpenCard, setIsOpenCard] = useState(false);

  function openCard() {
    setIsOpenCard(!isOpenCard);
  }

  return (
    <>
      <div style={isOpenCard && { filter: "blur(5px)" }}>
        <Header />
        <div className='bar'>
            <p className='page-text'>Video</p>
            <button>My Post</button> 
            <button>My Video</button> 
        </div>
        <div className="contents">
          <Card mode="video" open={openCard} />
          <Card mode="video" open={openCard} />
          <Card mode="video" open={openCard} />
          <Card mode="video" open={openCard} />
          <Card mode="video" open={openCard} />
          <Card mode="video" open={openCard} />
        </div>
        <Footer />
      </div>
      {isOpenCard && (
        <div className="big-card">
          <BigCard mode="video" open={openCard} />
        </div>
      )}
    </>
  );
}
