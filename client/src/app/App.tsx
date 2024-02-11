import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import SignIn from "../features/profile/SignIn";
import SignUp from "../features/profile/SignUp";
import Header from "../features/layouts/Header";
import { Toaster } from "react-hot-toast";
import NotFound from "../common/components/NotFound";
import Footer from "../features/layouts/Footer";
import AddStory from "../features/pages/addStory/AddStory";
import { AppRoutePaths } from "../common/model/route.model";
import Home from "../features/pages/Home";
import SearchPage from "../common/components/SearchPage";

const App = () => {
  return (
    <>
      <Router>
        <Toaster position="top-center" reverseOrder={true} />
        <Routes>
          <Route path={AppRoutePaths.HOME} element={<LayoutsWithHeader />}>
            <Route index element={<Home />}></Route>
            <Route path={AppRoutePaths.NEW_STORY} element={<AddStory />} />
            <Route path={AppRoutePaths.SEARCH} element={<SearchPage />} />
            <Route path={AppRoutePaths.NOT_FOUND} element={<NotFound />} />
          </Route>
          <Route path={AppRoutePaths.LOGIN} element={<SignIn />} />
          <Route path={AppRoutePaths.REGISTER} element={<SignUp />} />
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
      <div className="min-h-screen overflow-auto mb-6">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};
