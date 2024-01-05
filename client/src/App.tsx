import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import SignIn from "./features/profile/SignIn";
import SignUp from "./features/profile/SignUp";
import Header from "./features/layouts/Header";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          {/* <Route path="/" element={<LayoutsWithHeader />} /> */}
          <Route path="/login" element={<SignIn />} />
          <Route path="/register" element={<SignUp />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
const LayoutsWithHeader = () => {
  return (
    <>
      <Header />
      <Outlet />
      {/* <Footer /> */}
    </>
  );
};
