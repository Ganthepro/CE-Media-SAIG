import "./show-profile.css";
import closePic from "../assets/close.png";
import { useState, useEffect, useRef } from "preact/hooks";

function ShowProfile(props) {
  const [toEdit, setToEdit] = useState(false)
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const descriptionRef = useRef(null)
  const sexRef = useRef(null)
  const countryRef = useRef(null)
  function closePop() {
    props.close();
  }
  
  useEffect(() => {
    if (!toEdit) {
      fetch(`http://localhost:5500/getPublic/${localStorage.getItem('id')}`, {
        method: "GET",
      })
        .then(response => response.text())
        .then(fetchedData => {
            if (fetchedData !== 'id not found') 
                setData(JSON.parse(fetchedData));
        })
        .catch(error => {
          console.error(error);
        })
        .finally(() => {
          setIsLoading(false); // Set loading to false when data is fetched
        });
    }
  }, [toEdit]);
  
  async function updateData() {
    const data = {
      description : descriptionRef.current.value,
      sex : sexRef.current.value,
      country : countryRef.current.value,
      id : localStorage.getItem('id')
    }
    console.log(data)
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
            cursor: "pointer",
          }}
          onClick={closePop}
        />
        <div style={{ width: "200px" }}>
          <img src={isLoading ? null : data.profilePic != null && data.profilePic.startsWith('/') ? '/profilePic' + data.profilePic : data.profilePic} alt="profilePic" />
          <b
            style={{
              width: "110px",
              wordBreak: "break-word",
              textAlign: "center",
            }}
          >
            {isLoading ? "Loading" : data.username}
            <br />
            {props.isEdit && (
              <p
                style={{
                  margin: "0",
                  fontWeight: "normal",
                  cursor: "pointer",
                  fontSize: "small",
                }}
                className="edit"
              >
                Change Profile
              </p>
            )}
          </b>
        </div>
        <div>
          <b>Description</b>
          {toEdit && <input type={"text"} style={{ width: "40%" }} ref={descriptionRef} />}
          {!toEdit && (<p style={{ width: "150px", fontSize: "15px", margin: "0",textAlign:"center" }}>{isLoading ? "Loading" : data.description}</p>)}
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
