import './upload.css'
import Header from '../templent/header'
import Footer from '../templent/footer'
import { useRef, useEffect, useState } from 'preact/hooks'
import uploadFilePic from '../assets/file.png'

export function Upload() {
    const elementRefs = Array.from({ length: 2 }, () => useRef(null));
    const [mode, setMode] = useState('image')
    const [fileInput,setFileInput] = useState(null)
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
  
  const inputFile = useRef(null)
  const inputFileVideo = useRef(null)
  const inputFileTitle = useRef(null)
  const inputFileDescription = useRef(null)
  const box = useRef(null)
  const boxErr = useRef(null)
  const [isUpload,setIsUpload] = useState(false)
  
  function uploadPost() {
    setFileInput(inputFile.current);
    if (!fileInput || !fileInput.files || !fileInput.files[0]) {
      alert("No file selected");
      return;
    }
    box.current.style.backgroundImage = `url("${URL.createObjectURL(fileInput.files[0])}")`;
    boxErr.current.style.opacity = '0';
  }
  
  async function posted() {
    const newFormData = new FormData()
    const data = {
      title: inputFileTitle.current.value,
      description: inputFileDescription.current.value,
      username: localStorage.getItem('username'), 
    }
    console.log(fileInput.files[0])
    newFormData.append(mode, fileInput.files[0]);
    newFormData.append('jsonData', JSON.stringify(data));
    if (newFormData != null) {
      await fetch(`http://localhost:5500/postImage/${Date.now().toString()}`, {
        method: "POST",
        body: newFormData,
      })
        .then(response => response.text())
        .then(data => {
          if (data == "Save successfully")
            alert("Post Successfully")
          else 
            alert("Error")
        })
        .catch(error => {
          console.error(error);
        });
    }
  }
  
  async function postedVideo() {
    const file = await inputFileVideo.current
    if (!file || !file.files || !file.files[0]) {
      alert("No video selected");
      return;
    }
    const newFormData = new FormData()
    const data = {
      title: inputFileTitle.current.value,
      description: inputFileDescription.current.value,
      username: localStorage.getItem('username'),
    }
    newFormData.append(mode, file.files[0]);
    newFormData.append('jsonData', JSON.stringify(data));
    if (newFormData != null) {
      console.log("test")
      await fetch(`http://localhost:5500/postVideo/${Date.now().toString()}`, {
        method: "POST",
        body: newFormData,
      })
        .then(response => response.text())
        .then(data => {
          if (data == "Save successfully")
            alert("Post Successfully")
          else 
            alert("Error")
        })
        .catch(error => {
          console.error(error);
        });
    }
  }
  
  return(
      <>
          <Header />
          <div className='bar'>
              <p className='page-text'>Upload</p>
              <button onClick={() => {handleElementClick(0);setMode('image')}}  ref={elementRefs[0]} key={0}>Post</button> 
              <button onClick={() => {handleElementClick(1);setMode('video')}} ref={elementRefs[1]} key={1}>Video</button> 
          </div>
          <div className='main-upload'>
            <div className="input-box">
                <div id="in-image" ref={box} >
                    <div id="err-box" ref={boxErr} >
                        <img src={uploadFilePic} id="err-box-im" />
                        <p id="err-box-p">{!isUpload ? `Upload ${mode == 'image' ? 'Image' : 'Video'}` : "Uploaded"}</p>
                    </div>
                    <div className="option" id="in-option">
                        {mode == 'image' &&
                          <>
                            <input id="picture-input" type="file" name="picture" ref={inputFile} onChange={uploadPost} accept='image/*' />
                            <label for="picture-input" id="video-input-profile-label">Upload Image</label>
                          </>
                        }
                        {mode != 'image' &&
                          <>
                            <input id="video-input" type="file" name="video" ref={inputFileVideo} onChange={postedVideo} accept='video/*' />
                            <label for="video-input" id="video-input-profile-label">Upload and Post Video</label>
                          </>
                        }
                    </div>
                </div>
            </div>
            <div className='input-box-2'>
              <div>
                <label for="title-input">Title :</label>
                <input type="text" id="title-input" className='input-text' ref={inputFileTitle} />
              </div>
              <div>
                <label for="descirption-input">Descirption :</label>
                <input type="text" id="descirption-input" className='input-text' style={{height:'100px'}} ref={inputFileDescription} />
              </div>
              {mode == "image" &&
                <button className='input-post' onClick={posted} >Post</button>
              }
            </div>
          </div>
          <Footer />
      </>
  )
}

