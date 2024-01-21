import axios from "axios";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Card from "../../common/components/Card";
import Pagination from "../../common/components/Pagination";
import Skeleton from "../../common/components/Skeleton";

const Home = () => {
  const search = useLocation().search;
  const searchKey = new URLSearchParams(search).get("search");
  const [stories, setStories] = useState([""]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  // useEffect(() => {
  //   const getStories = async () => {
  //     setLoading(true);
  //     try {
  //       const { data } = await axios.get(
  //         `/story/getAllStories?search=${searchKey || ""}&page=${page}`
  //       );

  //       if (searchKey) {
  //         navigate({
  //           pathname: "/",
  //           search: `?search=${searchKey}${page > 1 ? `&page=${page}` : ""}`,
  //         });
  //       } else {
  //         navigate({
  //           pathname: "/",
  //           search: `${page > 1 ? `page=${page}` : ""}`,
  //         });
  //       }
  //       setStories(data.data);
  //       setPages(data.pages);

  //       setLoading(false);
  //     } catch (error) {
  //       setLoading(true);
  //     }
  //   };
  //   getStories();
  // }, [setLoading, search, page, navigate]);

  useEffect(() => {
    setLoading(false);
    setStories(["", "", "", "", "", "", ""]);
  }, [searchKey]);

  return (
    <div className="m-5 ml-12 mr-5">
      {loading ? (
        <div>
          {[...Array(3)].map(() => {
            return <Skeleton />;
          })}
        </div>
      ) : (
        <>
          <div className=" min-w-44 grid grid-cols-1 md:grid-cols-3 gap-4">
            {stories.slice(0, 6).map(() => {
              return <Card />;
            })}
          </div>
          <div className="flex justify-center mt-10">
            {stories.length > 6 && <Pagination />}
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
