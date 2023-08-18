import { Route } from "react-router-dom/cjs/react-router-dom.min";
import SignUp from "./Pages/SignUp";

import Profile from "./Pages/Profile";
import ProfilePage from "./Pages/ProfilePage";
function App() {
  return (
    <>
      <Route exact path={'/'}>
          <SignUp />
      </Route>
      <Route exact path={'/dummy'}>
        <Profile />
      </Route>
      <Route exact path={'/profilepage'}>
        <ProfilePage />
      </Route>
    </>
  );
}

export default App;
