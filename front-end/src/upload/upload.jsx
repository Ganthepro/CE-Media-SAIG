import './upload.css'
import Header from '../templent/header'
import Footer from '../templent/footer'
import { useRef, useEffect, useState } from 'preact/hooks'
import uploadFilePic from '../assets/file.png'

export function Upload() {
    const elementRefs = Array.from({ length: 2 }, () => useRef(null));
    const [mode, setMode] = useState('post')
    const handleElementClick = (clickedIndex) => {
    elementRefs.forEach((ref, index) => {
      if (index === clickedIndex) {
        ref.current.style.backgroundColor = 'orange';
        ref.current.style.color = 'white';
      } else {
        ref.current.style.backgroundColor = 'white';
        ref.current.style.border = '3px solid orange';
        ref.current.style.color = 'black'
      }
    });
  };
  useEffect(() => {handleElementClick(0)},[])
  const [fileStatus, setFileStatus] = useState(null);
  const [imageError, setImageError] = useState(false);
  const [imageData, setImageData] = useState(null);

  useEffect(() => {
    const fileInput = document.getElementById('picture-input');
    const err = document.getElementById('err-box');
    const errP = document.getElementById('err-box-p');
    const errIm = document.getElementById('err-box-im');

    const handleFileChange = () => {
      const file = fileInput.files[0];

      if (!file) {
        setImageError(true);
        err.style.opacity = 1;
        errP.innerText = 'No Data';
        errIm.setAttribute('src', 'image/ui.png');
      } else {
        setImageError(false);
        err.style.opacity = 0;

        const formData = new FormData();
        formData.append('image', file);

        // fetch(`/upload/${id}`, {
        //   method: 'POST',
        //   body: formData,
        //   mode: 'no-cors',
        // })
        //   .then((response) => response.blob())
        //   .then((data) => {
        //     setImageData(URL.createObjectURL(data));
        //   })
        //   .catch((error) => {
        //     console.error(error);
        //   });

        setFileStatus(file);
      }
    };

    fileInput.addEventListener('change', handleFileChange);

    return () => {
      fileInput.removeEventListener('change', handleFileChange);
    };
  }, []);
      
  return(
      <>
          <Header />
          <div className='bar'>
              <p className='page-text'>Upload</p>
              <button onClick={() => {handleElementClick(0);setMode('post')}}  ref={elementRefs[0]} key={0}>Post</button> 
              <button onClick={() => {handleElementClick(1);setMode('video')}} ref={elementRefs[1]} key={1}>Video</button> 
          </div>
          <div className='main-upload'>
            <div className="input-box">
                <div id="in-image">
                    <div id="err-box">
                        <img src={uploadFilePic} id="err-box-im" />
                        <p id="err-box-p">{`Upload ${mode == 'post' ? 'Image' : 'Video'}`}</p>
                    </div>
                    <div className="option" id="in-option">
                        <input id="picture-input" type="file" name="picture" />
                        <label for="picture-input">Choose File</label>
                    </div>
                </div>
            </div>
            <div className='input-box-2'>
              <div>
                <label for="title-input">Title :</label>
                <input type="text" id="title-input" className='input-text'/>
              </div>
              <div>
                <label for="descirption-input">Descirption :</label>
                <input type="text" id="descirption-input" className='input-text' style={{height:'100px'}}/>
              </div>
              <button className='input-post'>Post</button>
            </div>
          </div>
          <Footer />
      </>
  )
}

