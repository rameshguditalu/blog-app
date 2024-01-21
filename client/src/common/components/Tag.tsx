import { useDispatch, useSelector } from "react-redux";
import {
  blogEditorState,
  setBlogState,
} from "../../features/pages/addStory/services/blogEditorSlice";

const Tag = ({ tag, key }: { tag: string; key: number }) => {
  const dispatch = useDispatch();
  const blogData = useSelector(blogEditorState).blogState;
  const { tags } = blogData;

  const handleDelete = () => {
    const data = tags.filter((t) => t != tag);
    dispatch(setBlogState({ blogData: { ...blogData, tags: data } }));
  };

  return (
    <div className="relative p-2 mt-2 mr-2 px-5 bg-white rounded-full inline-block hover:bg-opacity-50 pr-10">
      <p className="outline-none">{tag}</p>
      <button
        className="mt-[2px]  rounded-full absolute right-3 top-1/2 -translate-y-1/2"
        onClick={handleDelete}
      >
        <i className="fi fi-sr-cross text-sm pointer-events-none"></i>
      </button>
    </div>
  );
};

export default Tag;
