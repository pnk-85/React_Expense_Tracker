import React, { useState } from "react";


const AuthContext = React.createContext({
    token : "",
    isLoggedIn : false,
    login : (token) => {},
    logout : () => {}
});

export const AuthContextProvider = (props) => {

    const firstToken = localStorage.getItem('token');
    const [token, setToken] = useState(firstToken);

const userLoggedIn = !!token;

const logInHandler = (tkn) => {
    setToken(tkn);
    localStorage.setItem('token', tkn)
};

const logOutHandler = () => {
    setToken(null);
    localStorage.removeItem('token');
};

const authContextValue = {
    token: token,
    isLoggedIn: userLoggedIn,
    login: logInHandler,
    logout: logOutHandler,
};


return (
    <AuthContext.Provider value={authContextValue} >
        {props.children}
    </AuthContext.Provider>
);
}

export default AuthContext;