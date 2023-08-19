import axios from "axios";
import React,{useContext, useRef,useState} from "react";
import { useHistory } from 'react-router-dom';
import AuthContext from "../Store/AuthContext";

const SignUp = () => {

    const [errorShow,setErrorShow] = useState(false);
    const [isLogIn, setIsLogIn] = useState(false);
    const history = useHistory();
    const authCtx = useContext(AuthContext);


    const emailRef = useRef();
    const passwordref = useRef();
    const confirmPasswordRef = useRef();


    const switchHandler = () => {
        setIsLogIn(!isLogIn);
        setErrorShow(false);
    };

    const loginHandler = (e) => {
        e.preventDefault();

        setErrorShow(false);
        if(emailRef.current.value && passwordref.current.value){
            axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB_KrVsqVyvnfxCyCt-K0OsCwLiMnhrEVU`,
            {
                email : emailRef.current.value,
                password : passwordref.current.value,
                returnSecureToken : true,
            })
            .then((res) => {
                console.log('use logged succes');
                authCtx.login(res.data.idToken);
                history.push('/dummy');
            })
            .catch((error) => {
                alert(error.response.data.error.message);
            })
        }else{
            setErrorShow(true);
        }
        
    }


    const signUpHandler = (e) => {
        e.preventDefault();

        setErrorShow(false);
        if(
            emailRef.current.value &&
            passwordref.current.value &&
            confirmPasswordRef.current.value
        ){
            axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB_KrVsqVyvnfxCyCt-K0OsCwLiMnhrEVU`,
            {
                email : emailRef.current.value,
                password : passwordref.current.value,
                returnSecureToken : true,
            })
            .then((res) => {
                console.log("user sucess");
                const token = res.data.idToken;
                console.log('res.data', token);
                setIsLogIn(!isLogIn);
            })
            .catch((error) => {
                alert(error.response.data.error.message);
            });
        }else{
            setErrorShow(true);
        }
    };



    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 mx-auto mt-5 p-3 text-white text-center">
                    <div className={`${
                        isLogIn ? "bg-info p-3 rounded-2" : "bg-warning p-3 rounded-2"
                    }`}>
                        <h3>{isLogIn ? "Sign Up" : "Login" }</h3>
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
                            <input type="password" placeholder="Password" className="form-control" ref={passwordref} />
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