import { useEffect, useState } from "react";
import InPageNavigation, {
  activeTabRef,
} from "../../common/components/InPageNavigation";
import AnimationWrapper from "../../common/components/PageAnimation";
import {
  LatestBlogs,
  fetchCategoryBlogs,
  fetchLatestBlogs,
  fetchTrendingBlogs,
} from "./addStory/services/blogEditorService";
import Loader from "../../common/components/Loader";
import LatestBlogCard from "../../common/components/LatestBlogCard";
import TrendingBlogCard from "../../common/components/TrendingBlogCard";
import NoDataMessage from "../../common/components/NoDataMessage";

let categories = [
  "programming",
  "hollywood",
  "film making",
  "social media",
  "cooking",
  "tech",
  "finances",
  "travel",
];

const Home = () => {
  const [latestBlogs, setLatestBlogs] = useState<LatestBlogs[]>();
  const [trendingBlogs, setTrendingBlogs] = useState<LatestBlogs[]>();
  const [pageState, setPageState] = useState("home");

  const loadBlogByCategor = (e: any) => {
    let category = e.target.innerText.toLowerCase();
    setLatestBlogs(undefined);
    if (pageState === category) {
      setPageState("home");
      return;
    }
    setPageState(category);
  };

  const getLatestBlogs = (page = 1) => {
    fetchLatestBlogs(page)
      .then((response) => {
        // let formateData = filterPaginationData({
        //   state: latestBlogs,
        //   data: response.data,
        //   page,
        //   countRoute: "/all-latest-blogs-count",
        // });
        setLatestBlogs(response.data);
      })
      .catch((err) => console.log(err));
  };

  const getTrendingBlogs = () => {
    fetchTrendingBlogs()
      .then((response) => {
        setTrendingBlogs(response.data);
      })
      .catch((err) => console.log(err));
  };

  const fetchBlogsByCategory = () => {
    fetchCategoryBlogs(pageState)
      .then((response) => {
        setLatestBlogs(response.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    activeTabRef.current.click();
    if (pageState == "home") getLatestBlogs();
    else fetchBlogsByCategory();
    getTrendingBlogs();
  }, [pageState]);

  return (
    <AnimationWrapper>
      <section className="h-cover flex justify-center gap-10">
        <div className="w-full">
          <InPageNavigation
            routes={[pageState, "trending blogs"]}
            defaultHidden={["trending blogs"]}
          >
            <>
              {!latestBlogs ? (
                <Loader />
              ) : latestBlogs.length ? (
                latestBlogs.map((blog, i) => {
                  const authorInfo = blog.author?.personal_info || {};
                  return (
                    <AnimationWrapper
                      transition={{ duration: 1, delay: i * 0.1 }}
                      key={i}
                    >
                      <LatestBlogCard content={blog} author={authorInfo} />
                    </AnimationWrapper>
                  );
                })
              ) : (
                <NoDataMessage message="Sorry there is no matching data to display" />
              )}
            </>
            <>
              {!trendingBlogs ? (
                <Loader />
              ) : trendingBlogs.length ? (
                trendingBlogs.map((blog, i) => {
                  return (
                    <AnimationWrapper
                      transition={{ duration: 1, delay: i * 0.1 }}
                      key={i}
                    >
                      <TrendingBlogCard blog={blog} index={i} />
                    </AnimationWrapper>
                  );
                })
              ) : (
                <NoDataMessage message="Sorry there is no matching data to display" />
              )}
            </>
          </InPageNavigation>
        </div>
        <div className="min-2-[40%] lg:min-w-[400px] max-w-min border-l border-grey pl-8 pt-3 max-md:hidden">
          <div className="flex flex-col gap-10">
            <div>
              <h1 className="font-medium text-xl mb-8">
                Stories from all interests
              </h1>
              <div className="flex gap-3 flex-wrap ">
                {categories.map((category, i) => {
                  return (
                    <button
                      key={i}
                      className={
                        "tag" +
                        (pageState == category ? " bg-black text-white" : " ")
                      }
                      onClick={loadBlogByCategor}
                    >
                      {category}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <h1 className="font-medium text-xl mb-8">
                Trending <i className="fi fi-rr-arrow-trend-up"></i>
              </h1>
              {!trendingBlogs ? (
                <Loader />
              ) : trendingBlogs.length ? (
                trendingBlogs.map((blog, i) => {
                  return (
                    <AnimationWrapper
                      transition={{ duration: 1, delay: i * 0.1 }}
                      key={i}
                    >
                      <TrendingBlogCard blog={blog} index={i} />
                    </AnimationWrapper>
                  );
                })
              ) : (
                <NoDataMessage message="Sorry there is no matching data to display" />
              )}
            </div>
          </div>
        </div>
      </section>
    </AnimationWrapper>
  );
};

export default Home;
