import { useParams } from "react-router-dom";
import InPageNavigation from "./InPageNavigation";
import Loader from "./Loader";
import AnimationWrapper from "./PageAnimation";
import LatestBlogCard from "./LatestBlogCard";
import NoDataMessage from "./NoDataMessage";
import { useSelector } from "react-redux";
import { blogEditorState } from "../../features/pages/addStory/services/blogEditorSlice";
import { useEffect, useState } from "react";
import axios from "axios";
import { appConfig } from "../model/route.model";
import UserCard from "./UserCard";
import { UserAccount } from "../../features/profile/services/profileService";

const SearchPage = () => {
  const { query } = useParams();
  const latestBlogs = useSelector(blogEditorState).latestBlogs;
  const [users, setUsers] = useState<UserAccount[]>();

  const fetchUsers = () => {
    axios
      .post(`${appConfig.REACT_API_BASE_URL}api/user/search-users`, {
        query,
      })
      .then((res) => {
        setUsers(res.data.data);
      });
  };

  useEffect(() => {
    setUsers([]);
    fetchUsers();
  }, [query]);

  const UserCardWrapper = () => {
    return (
      <>
        {users == null ? (
          <Loader />
        ) : users.length ? (
          users.map((user, i) => {
            return (
              <AnimationWrapper
                key={i}
                transition={{ duration: 1, delay: i * 0.08 }}
              >
                <UserCard user={user} />
              </AnimationWrapper>
            );
          })
        ) : (
          <NoDataMessage message="No users found" />
        )}
      </>
    );
  };

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
          <UserCardWrapper />
        </InPageNavigation>
      </div>
      <div className="min-w-[40%] lg:min-w-[350px] max-w-min border-l border-grey pl-8 pt-3 max-md:hidden">
        <h1 className="font-medium text-xl mb-8">
          Users related to search <i className="fi fi-rr-user mt-1"></i>
        </h1>
        <UserCardWrapper />
      </div>
    </section>
  );
};

export default SearchPage;
