//@ts-ignore
import Embed from "@editorjs/embed";
//@ts-ignore
import Paragraph from "@editorjs/paragraph";
//@ts-ignore
import List from "@editorjs/list";
//@ts-ignore
import Code from "@editorjs/code";
//@ts-ignore
import LinkTool from "@editorjs/link";
//@ts-ignore
import Image from "@editorjs/image";
//@ts-ignore
import Raw from "@editorjs/raw";
//@ts-ignore
import Header from "@editorjs/header";
//@ts-ignore
import Quote from "@editorjs/quote";
//@ts-ignore
import Marker from "@editorjs/marker";
//@ts-ignore
import CheckList from "@editorjs/checklist";
//@ts-ignore
import Delimiter from "@editorjs/delimiter";

export const EditorTools = {
  paragraph: Paragraph,
  embed: Embed,
  list: {
    class: List,
    inlineToolbar: true,
  },
  code: Code,
  linkTool: LinkTool,
  raw: Raw,
  header: {
    class: Header,
    config: {
      placeholder: "Type Heading...",
      levels: [1, 2, 3],
      defaultLevel: 1,
    },
  },
  quote: {
    class: Quote,
    inlineToolbar: true,
  },
  marker: Marker,
  checklist: CheckList,
  delimiter: Delimiter,
};
