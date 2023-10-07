import './post.css'
import Header from '../templent/header'
import Footer from '../templent/footer'
import Card from './card'

export function Post() {
  return (
    <>
      <Header />
      <div className='contents'>
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
      <Footer />
    </>
  )
}