import { Route, Switch } from "react-router-dom/cjs/react-router-dom.min";
import SignUp from "./Pages/SignUp";

import Profile from "./Pages/Profile";
import ProfilePage from "./Pages/ProfilePage";
function App() {
  return (
    <>
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
