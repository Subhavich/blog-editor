import ImageCaption from "./ImageCaption";
import Heading from "./Heading";
import Combo from "./Combo";
import Paragraph from "./Paragraph";

function renderEle(type, load, config) {
  switch (type) {
    case "heading":
      return <Heading load={load} config={config} />;
    case "combo":
      return <Combo load={load} config={config} />;
    case "imageCaption":
      return <ImageCaption load={load} config={config} />;
    case "paragraph":
      return <Paragraph load={load} config={config} />;
    default:
      return null;
  }
}

export const options = [
  {
    type: "heading",
    load: { text: "" },
    label: "Heading",
  },
  { type: "paragraph", load: { text: "" }, label: "Paragraph" },
  {
    type: "imageCaption",
    load: { img: "", text: "" },
    label: "Image with Caption",
  },
  {
    type: "combo",
    load: { head: "", text: "" },
    label: "Combo",
  },
];

export default renderEle;
