import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom/cjs/react-router-dom.min";
import SignUp from "./Pages/SignUp";
import AuthContext from "./Store/AuthContext";
import Profile from "./Pages/Profile";
import ProfilePage from "./Pages/ProfilePage";
import Navbar from "./Component/Navbar";
import ForgetPassword from "./Pages/ForgotPassword";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "./Store/auth";


function App() {

  const dispacth = useDispatch();
  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispacth(authActions.login());
    }
  }, []);

  const isLoggedIn = useSelector(state => state.auth.isAuthenticated);
  const theme = useSelector(state => state.theme.darkTheme);


  return (
    <>
      <Navbar />
      <div className={`${theme ? 'light' : 'dark'}`}>
        <Switch>
          <Route exact path={'/'}>
            <SignUp />
          </Route>
          {isLoggedIn && (
            <Route exact path={'/profile'}>
              <Profile />
            </Route>
          )}

          <Route path={'/forgetpassword'} >
            <ForgetPassword />
          </Route>
          {isLoggedIn && (
            <Route path={'/profilepage'}>
              <ProfilePage />
            </Route>
          )}
          <Route path={'*'}>
            <SignUp />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default App;
