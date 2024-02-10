import { useParams } from "react-router-dom";
import InPageNavigation from "./InPageNavigation";
import Loader from "./Loader";
import AnimationWrapper from "./PageAnimation";
import LatestBlogCard from "./LatestBlogCard";
import NoDataMessage from "./NoDataMessage";
import { useSelector } from "react-redux";
import { blogEditorState } from "../../features/pages/addStory/services/blogEditorSlice";

const SearchPage = () => {
  const { query } = useParams();
  const latestBlogs = useSelector(blogEditorState).latestBlogs;

  return (
    <section className="h-cover flex justify-center gap-10">
      <div className="w-full">
        <InPageNavigation
          routes={[`Search Results for "${query}"`, "Accounts Matched"]}
          defaultHidden={["Accounts Matched"]}
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
        </InPageNavigation>
      </div>
    </section>
  );
};

export default SearchPage;
