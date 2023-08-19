import { Route, Switch } from "react-router-dom/cjs/react-router-dom.min";
import SignUp from "./Pages/SignUp";

import Profile from "./Pages/Profile";
import ProfilePage from "./Pages/ProfilePage";
import Navbar from "./Component/Navbar";


function App() {
  return (
    <>
    <Navbar />
    <Switch>
    <Route exact path={'/'}>
          <SignUp />
      </Route>
      <Route  path={'/dummy'}>
        <Profile />
      </Route>
      
        <ProfilePage />
      <Route path={'/profilepage'} element={<ProfilePage />}  />
    </Switch>
      
    </>
  );
}

export default App;
