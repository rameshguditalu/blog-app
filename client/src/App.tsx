import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import SignIn from "./features/profile/SignIn";
import SignUp from "./features/profile/SignUp";
import Header from "./features/layouts/Header";
import { Toaster } from "react-hot-toast";
import NotFound from "./components/NotFound";
import Home from "./features/pages/Home";
import Footer from "./features/layouts/Footer";
import AddStory from "./features/pages/AddStory";

const App = () => {
  return (
    <>
      <Router>
        <Toaster position="top-center" reverseOrder={true} />
        <Routes>
          <Route path="/" element={<LayoutsWithHeader />}>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/new-story" element={<AddStory />} />
            <Route path="*" element={<NotFound />} />
          </Route>
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
      <Footer />
    </>
  );
};
