import { Link } from "react-router-dom";
import { LatestBlogs } from "../../features/pages/addStory/services/blogEditorService";
import { getDay } from "../helpers/helpers";

type props = {
  content: LatestBlogs;
  author: {
    fullName: string;
    userName: string;
    profile_img: string;
  };
};

const LatestBlogCard = ({ content, author }: props) => {
  const {
    createdAt,
    tags,
    title,
    description,
    image,
    activity: { likes },
    blogId: id,
  } = content;
  let { userName, profile_img } = author;

  return (
    <Link
      to={`blog/${id}`}
      className="flex gap-8 items-center border-b border-grey pb-5 mb-4"
    >
      <div className="w-full">
        <div className="flex gap-2 items-center mb-7">
          <img
            src={profile_img}
            alt="profile"
            className="w-6 h-6 rounded-full"
          />
          <p className="line-clamp-1">@{userName}</p>
          <p className="min-w-fit">{getDay(createdAt)}</p>
        </div>
        <h1 className="blog-title">{title}</h1>
        <p className="my-3 text-xl font-gelasio leading-7 max-sm:hidden md:max-[1100px]:hidden line-clamp-2">
          {description}
        </p>
        <div className="flex gap-4">
          <span className="ml-3 flex items-center gap-2 text-dark-grey text-xl">
            <i className="fi fi-rr-heart"></i>
            {likes}
          </span>
          {tags.map((tag) => {
            return <span className="btn-light py-1 px-4">{tag}</span>;
          })}
        </div>
      </div>
      <div className="h-28 aspect-square bg-grey">
        <img src={image} className="w-full h-full aspect-square object-cover" />
      </div>
    </Link>
  );
};

export default LatestBlogCard;
