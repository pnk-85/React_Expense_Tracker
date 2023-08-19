import React, { useContext } from "react";
import axios from "axios";
import AuthContext from "../Store/AuthContext";


const Navbar = () => {

    const authCtx = useContext(AuthContext);

    const verifyEmailHandler = () => {

        axios.post("https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyB_KrVsqVyvnfxCyCt-K0OsCwLiMnhrEVU",
            {
                requestType: 'VERIFY_EMAIL',
                idToken: authCtx.token
            })
            .then((res) => console.log(res.data))
            .catch((err) => {
                console.log(err.response.data.error.message);
                alert(err.response.data.error.message);
            })
    }




    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark p-3">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Navbar
          </a>
  
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">
                  Home
                </a>
              </li>
            </ul>
            <div className="mx-auto ">
              {authCtx.isLoggedIn && (
                <button
                  className="btn btn-secondary "
                  onClick={verifyEmailHandler}
                >
                  Verify Email
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>
    );
};

export default Navbar;