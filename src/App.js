import React, {useContext} from "react";
import { Route, Switch } from "react-router-dom/cjs/react-router-dom.min";
import SignUp from "./Pages/SignUp";
import AuthContext from "./Store/AuthContext";
import Profile from "./Pages/Profile";
import ProfilePage from "./Pages/ProfilePage";
import Navbar from "./Component/Navbar";
import ForgetPassword from "./Pages/ForgotPassword";


function App() {
  const authCtx = useContext(AuthContext);


  return (
    <>
    <Navbar />
    <Switch>
    <Route exact path={'/'}>
          <SignUp />
      </Route>
      {authCtx.isLoggedIn && (
        <Route  path={'/profile'}>
        <Profile />
      </Route>
      )}
      
        <Route path={'/forgetpassword'} >
          <ForgetPassword />
        </Route>
      {authCtx.isLoggedIn && (
        <Route path={'/profilepage'}>
        <ProfilePage />
      </Route>
      )}
      <Route path={'*'}>
        <SignUp />
      </Route>
    </Switch>
      
    </>
  );
}

export default App;
