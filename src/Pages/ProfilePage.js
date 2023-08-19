import React,{useRef, useEffect, useContext} from "react";
import axios from "axios";
import AuthContext from "../Store/AuthContext";


const ProfilePage = () => {

    const nameRef = useRef();
    const photoRef = useRef();
    const authCtx = useContext(AuthContext);


    function getData () {
        const token = localStorage.getItem('token');

        axios.post('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyB_KrVsqVyvnfxCyCt-K0OsCwLiMnhrEVU',
        {
            idToken : token
        })
        .then((res) => {
          // console.log("res.data imported profile data", res.data.users[0]);
          if (!res.data.users[0].displayName && !res.data.users[0].photoUrl) {
            nameRef.current.value = "";
            photoRef.current.value = "";
          } else {
            nameRef.current.value = res.data.users[0].displayName;
            photoRef.current.value = res.data.users[0].photoUrl;
            authCtx.isProfileCompleted = true;
            authCtx.setUname(res.data.users[0].displayName);
          }
        })
        .catch((error) => console.log(error.response.data.error.message));
    };
    useEffect(() => {
        getData();
    },[]);

    const updateHandler = () => {
        
       const token = localStorage.getItem('token');

       axios.post("https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyB_KrVsqVyvnfxCyCt-K0OsCwLiMnhrEVU",
       {
        idToken: token,
          displayName: nameRef.current.value,
          photoUrl: photoRef.current.value,
          returnSecureToken: true,
       })
       .then((res) => console.log(res.data))
       .catch((err) => console.log(err.message));
    };


    return (
        <>
        <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 text-center mx-auto border bg-info text-white p-3">
          <h2>Contact Details</h2>
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-md-4 mx-auto">
          <form>
            <label className="form-label"> Full Name </label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Name"
              ref={nameRef}
            />
          </form>
        </div>
        <div className="col-md-4 mx-auto">
          <form>
            <label className="form-label"> Profile Photo URL </label>
            <input
              type="text"
              className="form-control"
              placeholder="Paste Photo URL"
              ref={photoRef}
            />
          </form>
        </div>
        <div className="col=md-8 text-center mt-4">
          <button
            className="ms-5 me-5 p-3 btn btn-info fw-bold"
            onClick={() => updateHandler()}
          >
            Update
          </button>
          <button className="ms-5 me-5 p-3 btn btn-danger fw-bold">
            Cancel
          </button>
        </div>
      </div>
    </div>
    </>
        
    );
};

export default ProfilePage;