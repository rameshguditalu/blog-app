import { Link } from "react-router-dom";
import { AppRoutePaths } from "../model/route.model";
import pageNotFoundImage from "../../assets/svg/404.png";

const NotFound = () => {
  return (
    <section className="h-cover relative p-10 flex flex-col items-center gap-20 text-center">
      <img
        src={pageNotFoundImage}
        alt=""
        className="select-none border-2 border-grey w-72 aspect-square object-cover rounded"
      />
      <h1 className="text-4xl font-gelasio leading-7">Page Not Found</h1>
      <p className="text-dark-grey text-xl leading-7 -mt-8">
        The Page you are looking for does not exists. Head back to the{" "}
        <Link to={AppRoutePaths.HOME} className="text-black underline">
          home Page
        </Link>
      </p>
    </section>
  );
};
export default NotFound;
