import './post.css'
import Header from '../templent/header'
import Footer from '../templent/footer'
import Card from '../card'
import BigCard from '../big_card'
import { useState } from 'preact/hooks'

export function Post() {
  const [isOpenCard,setIsOpenCard] = useState(false)
  function openCard() {
    setIsOpenCard(!isOpenCard)
  }
  
  return (
    <>
      <div>
        <Header />
        <div className='contents'>
          <Card mode="pic" open={openCard}/>
          <Card mode="pic" open={openCard}/>
          <Card mode="pic" open={openCard}/>
          <Card mode="pic" open={openCard}/>
          <Card mode="pic" open={openCard}/>
          <Card mode="pic" open={openCard}/>
        </div>
        <Footer />
      </div>
      {isOpenCard &&
      <div className='big-card'>
        <BigCard mode="pic"/>
      </div> 
      }
    </>
  )
}