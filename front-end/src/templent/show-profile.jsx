import "./show-profile.css";
import closePic from '../assets/close.png'

function ShowProfile(props) {
    function closePop() {
        props.close()
        console.log("test")
    }
    
  return (
    <>
        <div className="main-edit-profile">
            <img src={closePic} style={{position:"absolute",top:"10px",right:"10px",height:"20px",cursor:"pointer"}} onClick={closePop}/>
            <div style={{width:"200px"}}>
                <img src={localStorage.getItem("photoURL")} alt="profilePic" />
                <b style={{width:"110px",wordBreak:"break-word",textAlign:"center"}}>
                {localStorage.getItem("username")}
                <br />
                {props.isEdit && <p style={{ margin: "0", fontWeight: "normal", cursor: "pointer",fontSize:"small" }} className='edit'>
                    Change Profile
                </p>}
                </b>
            </div>
            <div>
                <b>Description</b>
                <p style={{width:"150px",fontSize:"15px",margin: "0"}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. optio ad magni mollitia. Assumenda, neque.</p>
            </div>
            <div>
                <b>Sex</b>
                <p style={{fontSize:"15px",margin: "0"}}>Male</p>
            </div>
            <div>
                <b>Country</b>
                <p style={{fontSize:"15px",margin: "0"}}>Thailand</p>
            </div>
            {props.isEdit && <b style={{cursor:"pointer"}} className='edit'>Edit</b>}
            {!props.isEdit && <a href={`/profile?id=${localStorage.getItem('username')}`} style={{color:"black",textDecoration:"none"}}><b style={{cursor:"pointer"}} className='edit'>View Post/Video</b></a>}
        </div>
        <div className="for-blur"></div>
    </>
  );
}

export default ShowProfile;
