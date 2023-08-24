import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import {useHistory} from 'react-router-dom'
import {authActions} from '../Store/auth';
import { NavLink } from "react-router-dom/cjs/react-router-dom";

const Navbar = () => {

    const [showTotal, setShowTotal] = useState(false);
    const history = useHistory();

    const auth = useSelector(state => state.auth.isAuthenticated);
    const token = useSelector(state => state.auth.token);
    const total = useSelector(state => state.expenses.total);

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




    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark p-3">
        <div className="container-fluid">
          <h4 className="navbar-brand">Navbar</h4>
  
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
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
                <botton
                className='btn btn-success ms-4'
                onClick={logOutHandler}>
                  Active Premium
                </botton>
              )}
          </div>
            )}
            </div>
        </div>
      </nav>
    );
};

export default Navbar;