import React,{useRef} from "react";
import axios from "axios";


const ProfilePage = () => {

    const nameRef = useRef();
    const photoRef = useRef();

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
    );
};

export default ProfilePage;