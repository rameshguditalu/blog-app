import { Link } from "react-router-dom";
import { LatestBlogs } from "../../features/pages/addStory/services/blogEditorService";
import { getDay } from "../helpers/helpers";

type props = {
  blog: LatestBlogs;
  index: number;
};

const TrendingBlogCard = ({ blog, index }: props) => {
  let {
    title,
    blogId: id,
    author: {
      personal_info: { fullName, userName, profile_img },
    },
    createdAt,
  } = blog;
  return (
    <Link to={`/blog/${id}`} className="flex gap-5 mb-8">
      <h1 className="blog-index">
        {index < 10 ? "0" + (index + 1) : index + 1}
      </h1>
      <div>
        <div className="flex gap-2 items-center mb-4">
          <img
            src={profile_img}
            alt="profile"
            className="w-6 h-6 rounded-full"
          />
          <p className="line-clamp-1">@{userName}</p>
          <p className="min-w-fit">{getDay(createdAt)}</p>
        </div>
        <h1 className="blog-title">{title}</h1>
      </div>
    </Link>
  );
};

export default TrendingBlogCard;
