import AnimationWrapper from "./PageAnimation";
import DefaultBanner from "../../assets/blog banner.png";
import { useEffect, useRef } from "react";
import EditorJS, { OutputData } from "@editorjs/editorjs";
import { EditorTools } from "../../constants/tools";
import { useDispatch, useSelector } from "react-redux";
import {
  blogEditorState,
  setBlogState,
} from "../../features/pages/addStory/services/blogEditorSlice";

export type props = {
  editorData: OutputData;
  setEditorData: (data: OutputData) => void;
};

const BlogEditor = ({ editorData, setEditorData }: props) => {
  const blogData = useSelector(blogEditorState).blogState;
  const dispatch = useDispatch();
  const ref = useRef<EditorJS>();

  const handleUpload = (e: any) => {
    let img = e.target.files[0];
    dispatch(
      setBlogState({
        blogData: { ...blogData, image: URL.createObjectURL(img) },
      })
    );
  };

  const handleTitleKeyDown = (e: any) => {
    if (e.keyCode == 13) {
      e.preventDefault();
    }
  };

  const handleTitleChange = (e: { target: any }) => {
    let input = e.target;
    input.style.height = "auto";
    input.style.height = input.scrollHeight + "px";
    dispatch(
      setBlogState({
        blogData: { ...blogData, title: input.value },
      })
    );
  };

  useEffect(() => {
    if (!ref.current) {
      const editor = new EditorJS({
        holderId: "textEditor",
        tools: EditorTools,
        data: editorData,
        placeholder: "Let's write an awesome story",
        async onChange(api) {
          const data = await api.saver.save();
          setEditorData(data);
          dispatch(
            setBlogState({
              blogData: { ...blogData, content: data },
            })
          );
        },
      });
      ref.current = editor;
    }
    return () => {
      if (ref.current && ref.current.destroy) {
        ref.current.destroy();
      }
    };
  }, []);

  return (
    <>
      <AnimationWrapper>
        <section>
          <div className="mx-auto max-w-[900px] w-full">
            <div className="relative aspect-video hover:opacity-80 bg-white border-4 border-dotted border-grey">
              <label htmlFor="uploadBanner">
                <img
                  src={!blogData.image ? DefaultBanner : blogData.image}
                  className="z-20"
                />
                <input
                  className="cursor-pointer"
                  id="uploadBanner"
                  type="file"
                  accept=".png, .jpg, .jpeg"
                  hidden
                  onChange={handleUpload}
                />
              </label>
              <button
                className="btn-light hidden md:block py-2"
                onClick={() =>
                  dispatch(
                    dispatch(
                      setBlogState({
                        blogData: {
                          ...blogData,
                          image: "",
                        },
                      })
                    )
                  )
                }
              >
                Remove Image
              </button>
            </div>
            <textarea
              placeholder="Title"
              className="text-4xl font-medium w-full h-20 outline-none resize-none mt-10 leading-tight placeholder:opacity-40"
              onKeyDown={handleTitleKeyDown}
              onChange={handleTitleChange}
              value={blogData.title}
            ></textarea>
            <hr className="w-full opacity-10 my-5" />
            <div id="textEditor" className="font-gelasio"></div>
          </div>
        </section>
      </AnimationWrapper>
    </>
  );
};

export default BlogEditor;
