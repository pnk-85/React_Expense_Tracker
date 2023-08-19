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
    addExpense : () => {},
    removeExpense : () => {}
});

export const AuthContextProvider = (props) => {

    const firstToken = localStorage.getItem('token');
    const [token, setToken] = useState(firstToken);
    const [profile, setProfile] = useState(false);
    const [uname, setUname] = useState('');
    const [items, setItems] = useState([]);

const userLoggedIn = !!token;

const addExpenseHandler = () => {
    setItems([
        ...items,
        {...items, key: items.length +1, id : items.length + 1}
    ]);
    console.log('items in AurhContext', items);
};

const removeExpenseHandler = (id) => {
    setItems(items.filter((item) => id !== item.id));
};

useEffect(() => {
    logInHandler(token)
},[]);

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
    uname : uname,
    items : items,
    isLoggedIn: userLoggedIn,
    setProfileCompleted : profile,
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