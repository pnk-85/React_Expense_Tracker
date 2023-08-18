import { Route } from "react-router-dom/cjs/react-router-dom.min";
import SignUp from "./Component/SignUp";
import DummyScreen from "./Component/DummyScreen";
function App() {
  return (
    <>
      <Route exact path={'/'}>
          <SignUp />
      </Route>
      <Route exact path={'/dummy'}>
        <DummyScreen />
      </Route>
    </>
  );
}

export default App;
