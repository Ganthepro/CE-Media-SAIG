import "./show-profile.css";
import closePic from "../assets/close.png";
import userPic from '../assets/user.png'
import { useState, useEffect, useRef } from "preact/hooks";

function ShowProfile(props) {
  const [toEdit, setToEdit] = useState(false)
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const descriptionRef = useRef(null)
  const sexRef = useRef(null)
  const countryRef = useRef(null)
  const inputPic = useRef(null)
  function closePop() {
    props.close();
  }
  
  async function getItem() {
    console.log(localStorage.getItem('id'))
    await fetch(`http://localhost:5500/getPublic/${props.id}`, {
      method: "GET",
    })
      .then(response => response.text())
      .then(fetchedData => {
          if (fetchedData !== 'User not found') {
            setData(JSON.parse(fetchedData));
            console.log(data.username)
          }
      })
      .catch(error => {
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false); // Set loading to false when data is fetched
      });
  }
  
  useEffect(() => {
    if (!toEdit) 
      getItem()
  }, [toEdit]);
  
  async function updateData() {
    const data = {
      description : descriptionRef.current.value,
      sex : sexRef.current.value,
      country : countryRef.current.value,
      id : localStorage.getItem('id')
    }
    await fetch('http://localhost:5500/update',{
      method: 'PUT',
      body: JSON.stringify(data) ,
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => {
      if (!response.ok) 
        throw new Error('Failed to fetch data');
      else 
        console.log('ok')
    })
    setToEdit(false)
  }
  
  async function uploadProfilePic() {
    const formData = new FormData();
    const fileInput = inputPic.current;
    if (!fileInput || !fileInput.files || !fileInput.files[0]) {
      alert("No file selected");
      return;
    }
    formData.append('image', fileInput.files[0]);
    let im;
    await fetch(`http://localhost:5500/uploadProfilePic/${localStorage.getItem('id')}`, {
      method: 'POST',
      body: formData,
    })
      .then(response => response.blob())
      .then(data => {
        console.log(data);
        im = data;
      })
      .catch(error => {
        console.error(error);
      });
    if (im) {
      const imageUrl = URL.createObjectURL(im);
    }
    await getItem();
  }
  
  return (
    <>
      <div className="main-edit-profile">
        <img
          src={closePic}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            height: "20px",
            width: "20px",
            cursor: "pointer",
          }}
          onClick={closePop}
        />
        <div style={{ width: "225px"}}>
          <img src={isLoading ? null : data.profilePic == null ? userPic : data.profilePic.startsWith('/') ? '/profilePic' + data.profilePic : data.profilePic} alt="profilePic" />
          <div style={{display:"flex",justifyContent:"space-around",flexDirection:"column",width:"130px"}}>
            <b
              style={{
                width: "110px",
                wordBreak: "break-word",
                textAlign: "center",
              }}
            >
              {isLoading ? "Loading" : data.username}
              <br />
            </b>
            {props.isEdit &&  
              <>
                <input id="picture-input-profile" type="file" name="picture" ref={inputPic} onChange={uploadProfilePic}/>
                <label for="picture-input-profile" id="picture-input-profile-label">Change Profile</label>
              </>
            }
          </div>
        </div>
        <div>
          <b>Description</b>
          {toEdit && <input type={"text"} style={{ width: "40%" }} ref={descriptionRef} />}
          {!toEdit && (<p style={{ width: "150px", fontSize: "15px", margin: "0",textAlign:"center",wordWrap:"break-word" }}>{isLoading ? "Loading" : data.description}</p>)}
        </div>
        <div>
          <b>Sex</b>
          {toEdit && <input type={"text"} style={{ width: "40%" }} ref={sexRef} />}
          {!toEdit && <p style={{ fontSize: "15px", margin: "0",textAlign:"center" }}>{isLoading ? "Loading" : data.sex}</p>}
        </div>
        <div>
          <b>Country</b>
          {toEdit && <input type={"text"} style={{ width: "40%" }} ref={countryRef} />}
          {!toEdit && <p style={{ fontSize: "15px", margin: "0",textAlign:"center" }}>{isLoading ? "Loading" : data.country}</p>}
        </div>
        {props.isEdit && !toEdit && (
          <b
            style={{ cursor: "pointer" }}
            className="edit"
            onClick={() => setToEdit(true)}
          >
            Edit
          </b>
        )}
        {props.isEdit && toEdit && (
          <div style={{ width: "60%" }}>
            <b
              style={{ cursor: "pointer" }}
              className="edit"
              onClick={updateData}
            >
              Apply
            </b>
            <b
              style={{ cursor: "pointer" }}
              className="edit"
              onClick={() => setToEdit(false)}
            >
              Cancel
            </b>
          </div>
        )}
        {!props.isEdit && (
          <a
            href={`/profile?id=${localStorage.getItem("username")}`}
            style={{ color: "black", textDecoration: "none" }}
          >
            <b style={{ cursor: "pointer" }} className="edit">
              View Post/Video
            </b>
          </a>
        )}
      </div>
      <div className="for-blur"></div>
    </>
  );
}

export default ShowProfile;
