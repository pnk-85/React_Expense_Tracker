import React, { useState,useEffect } from "react";


const AuthContext = React.createContext({
    token : "",
    uname : "",
    items : [],
    isLoggedIn : false,
    isProfileCompleted : false,
    setProfile : () => {},
    setUname : () => {},
    login : (token) => {},
    logout : () => {},
    addExpense : (item) => {},
    removeExpense : () => {},
    setItems : () => {}
});

export const AuthContextProvider = (props) => {

    let firstToken;
    const [token , setToken] = useState(firstToken);
    const [profile, setProfile] = useState(false);
    const [uname, setUname] = useState('');
    const [items, setItems] = useState([]);

    if(localStorage.getItem('token')) {
        firstToken = localStorage.getItem('token');
    } else {
        firstToken = '';
    }

let userLoggedIn = !!token;

const addExpenseHandler = (item) => {
    setItems([
        ...items,
        {...item, key: items.length + 1, id : items.length + 1}
    ]);
    console.log('items in AuthContext', items);
};

const removeExpenseHandler = (id) => {
    setItems(items.filter((item) => id !== item.id));
};

useEffect(() => {
    logInHandler(token)
},[]);

const logInHandler = (tkn) => {
    setItems([]);
    setToken(tkn);
    localStorage.setItem('token', tkn)
};

const logOutHandler = () => {
    setToken(null);
    localStorage.removeItem('email');
    localStorage.removeItem('token');
};

const authContextValue = {
    token: token,
    uname : uname,
    items : items,
    isLoggedIn: userLoggedIn,
    isProfileCompleted : profile,
    setItems : setItems,
    setProfile : setProfile,
    setUname : setUname,
    login: logInHandler,
    logout: logOutHandler,
    addExpense : addExpenseHandler,
    removeExpense : removeExpenseHandler,
};


return (
    <AuthContext.Provider value={authContextValue} >
        {props.children}
    </AuthContext.Provider>
);
}

export default AuthContext;