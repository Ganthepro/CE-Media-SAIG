import './video.css'
import Header from '../templent/header'
import Footer from '../templent/footer'
import Card from '../card'

export function Video() {
    return(
        <>
            <Header />
            <div className='contents'>
                <Card mode="video"/>
                <Card mode="video"/>
                <Card mode="video"/>
                <Card mode="video"/>
                <Card mode="video"/>
                <Card mode="video"/>
            </div>
            <Footer />
        </>
    )
}