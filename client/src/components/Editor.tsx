import { useEffect, useState } from "react";
import { EditorTools } from "../constants/tools";
import EditorJS, { OutputData } from "@editorjs/editorjs";

const Editor = () => {
  const [data, setData] = useState<OutputData>();

  useEffect(() => {
    const editor = new EditorJS({
      holder: "editor",
      tools: EditorTools,
      autofocus: true,
      onChange: async () => {
        try {
          const outputData = await editor.save();
          setData(outputData);
        } catch (error) {
          console.error("Error saving editor content:", error);
        }
      },
    });
  }, []);

  return (
    <>
      <div id="editor"></div>
    </>
  );
};

export default Editor;
