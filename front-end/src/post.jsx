import './post.css'
import Header from './header'
import Footer from './footer'
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
