import axios from "axios";
import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';
import { authActions } from "../Store/auth";
import { expenseActions } from "../Store/expenses";


const SignUp = () => {

    const [errorShow, setErrorShow] = useState(false);
    const [isLogIn, setIsLogIn] = useState(false);
    const history = useHistory();

    const dispatch = useDispatch();



    const emailRef = useRef();
    const passwordref = useRef();
    const confirmPasswordRef = useRef();


    const switchHandler = () => {
        setIsLogIn(!isLogIn);
        setErrorShow(false);
    };

    const goToforgetpassword = (e) => {
        e.preventDefault();
        history.push("/forgetpassword");
    };

    const loginHandler = (e) => {
        e.preventDefault();
        dispatch(expenseActions.removeall());
        setErrorShow(false);
        if (emailRef.current.value && passwordref.current.value) {
            localStorage.setItem("email", emailRef.current.value);
            axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB_KrVsqVyvnfxCyCt-K0OsCwLiMnhrEVU`,
                {
                    email: emailRef.current.value,
                    password: passwordref.current.value,
                    returnSecureToken: true,
                })
                .then((res) => {
                    localStorage.setItem('token', res.data.idToken);
                    history.push('/profile');

                    dispatch(authActions.login());
                })
                .catch((error) => {
                    alert(error.response.data.error.message);
                })
        } else {
            setErrorShow(true);
        }

    }


    const signUpHandler = (e) => {
        e.preventDefault();

        setErrorShow(false);
        if (
            emailRef.current.value &&
            passwordref.current.value &&
            confirmPasswordRef.current.value
        ) {
            axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB_KrVsqVyvnfxCyCt-K0OsCwLiMnhrEVU`,
                {
                    email: emailRef.current.value,
                    password: passwordref.current.value,
                    returnSecureToken: true,
                })
                .then((res) => {

                    setIsLogIn(!isLogIn);
                })
                .catch((error) => {
                    alert(error.response.data.error.message);
                });
        } else {
            setErrorShow(true);
        }
    };



    return (
        <div
            className="container-fluid"
            style={{ height: "100vh", paddingTop: "100px" }}
        >
            <div className="row">
                <div className="col-md-6 mx-auto mt-5 p-3  text-white text-center">
                    <div className={`${isLogIn ? "bg-info p-3 rounded-2" : "bg-warning p-3 rounded-2"
                        }`}>
                        <h3>{isLogIn ? "Sign Up" : "Login"}</h3>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-5 mx-auto mt-3 border border-3 border-info rounded-3 p-3">
                    <form>
                        <div className="form-group">
                            <label className="form-label fw-bolder">Email</label>
                            <input typt="email" placeholder="Email" className="form-control" ref={emailRef} />
                        </div>
                        <div className="form-group mt-3">
                            <label className="form-label fw-bolder">Password</label>
                            <input type="password" placeholder="Password" className="form-control" autoComplete="on" ref={passwordref} />
                        </div>

                        {isLogIn && (
                            <div className="form-group mt-3">
                                <label className="form-label fw-bolder">Confirm Password</label>
                                <input type="password" placeholder="Confirm Password" className="form-control" ref={confirmPasswordRef} />
                            </div>
                        )}

                        <div className="d-grid">
                            {errorShow && (
                                <h4 className="text-center mt-3 text-danger">
                                    All Field Are Mandatory !!!!
                                </h4>
                            )}

                            {isLogIn && (
                                <button className="btn btn-primary mt-3 p-2 rounded-pill" onClick={signUpHandler}>
                                    Sign Up
                                </button>
                            )}

                            {!isLogIn && (
                                <button className="btn btn-primary mt-3 p-2 rounded-pill" onClick={loginHandler}>
                                    Login
                                </button>
                            )}
                            {!isLogIn && (
                                <button
                                    className="btn btn-link fw-bold"
                                    onClick={goToforgetpassword}
                                >
                                    Forget Password
                                </button>
                            )}
                        </div>
                    </form>
                    <div className="d-grid">
                        <button className="btn btn-outline-success mt-3 p-2 rounded fw-bold" onClick={switchHandler} >
                            {isLogIn ? "Have an account?? Login" : "create account"}
                        </button>
                    </div>
                </div>
            </div>{" "}
        </div>
    )
}


export default SignUp;