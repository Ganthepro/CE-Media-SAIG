import './post.css'
import Header from '../templent/header'
import Footer from '../templent/footer'
import Card from '../card'
import { useState } from 'preact/hooks'

export function Post() {
  const [isOpenCard,setIsOpenCard] = useState(false)
  function openCard() {
    
  }
  
  return (
    <>
      <Header />
      <div className='contents'>
        <Card mode="pic"/>
        <Card mode="pic"/>
        <Card mode="pic"/>
        <Card mode="pic"/>
        <Card mode="pic"/>
        <Card mode="pic"/>
      </div>
      <Footer />
    </>
  )
}