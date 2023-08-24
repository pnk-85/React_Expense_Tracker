import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import {useHistory} from 'react-router-dom'
import {authActions} from '../Store/auth';
import { NavLink } from "react-router-dom/cjs/react-router-dom";
import {themeActions} from '../Store/theme';
import './Navbar.css'

const Navbar = () => {

    const [showTotal, setShowTotal] = useState(false);
    const [premiumActivate, setPremiumActivate] = useState(false);
    const history = useHistory();

    const auth = useSelector(state => state.auth.isAuthenticated);
    const token = useSelector(state => state.auth.token);
    const total = useSelector(state => state.expenses.total);
    const theme = useSelector(state => state.theme.darkTheme);

    useEffect(() => {
      if(total > 10000){
        setShowTotal(true);
      }else {
        setShowTotal(false);
      };
    }, [total]);

    const dispatch = useDispatch();

    const verifyEmailHandler = () => {

        axios.post("https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyB_KrVsqVyvnfxCyCt-K0OsCwLiMnhrEVU",
            {
                requestType: 'VERIFY_EMAIL',
                idToken: token
            })
            .then((res) => console.log(res.data))
            .catch((err) => {
                console.log(err.response.data.error.message);
                alert(err.response.data.error.message);
            })
    }

    const logOutHandler = () => {
        dispatch(authActions.logout());
        history.push('./');
    };

    const changeTheme = () => {
      dispatch(themeActions.changeTheme());
    }

    return (
      <nav
      style={{
        position: "fixed",
        width: "100%",
      }}
      className={`${
        theme
          ? "navbar navbar-expand-lg bg-warning p-3"
          : "navbar navbar-expand-lg bg-dark p-3"
      }`}
    >
      <div className="container-fluid ">
        {/* <h4 className="navbar-brand">Navbar</h4> */}
        <div className="heading waviy rounded-3 ps-3 pe-3 ">
          <span >ExpenseTracker</span>
          

        </div>
  
          <div className="collapse navbar-collapse ps-5" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item fw-folder">
                {auth && <NavLink to='/profile'> Home </NavLink>}
                {!auth && <NavLink to='/'> Home </NavLink>}
              </li>
            </ul>
            {auth && (
              <div className="mx-auto">
                <button
                  className="btn btn-secondary "
                  onClick={verifyEmailHandler}
                >
                  Verify Email
                </button>
             
                <button className="btn btn-danger ms-4"
                onClick={logOutHandler} >
                    Logout
                </button>
              

              {showTotal && (
                 <>
                 {!premiumActivate && (
                   <button
                     className="btn btn-success ms-4 "
                     onClick={() => setPremiumActivate(true)}
                   >
                     Activate Premium
                   </button>
                 )}
                 {premiumActivate && (
                   <button className="btn btn-success ms-4 ">
                     <div className="form-check form-switch">
                       <label className="form-check-label">Change Theme</label>
                       <input
                         className="form-check-input"
                         type="checkbox"
                         id="flexSwitchCheckDefault"
                         onClick={() => changeTheme()}
                       />
                     </div>
                   </button>
                 )}
               </>
              )}
          </div>
            )}
            </div>
        </div>
      </nav>
    );
};

export default Navbar;