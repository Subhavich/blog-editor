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
    load: { text: "add heading here" },
    label: "Heading",
  },
  {
    type: "paragraph",
    load: { text: "add long text here" },
    label: "Paragraph",
  },
  {
    type: "imageCaption",
    load: {
      img: "https://media.cntraveler.com/photos/53d9d56c6dec627b149da069/master/pass/malabadi-bridge-batman-turkey.jpg",
      text: "add image caption here",
    },
    label: "Image with Caption",
  },
  {
    type: "combo",
    load: { head: "add heading here", text: "add long text here" },
    label: "Combo",
  },
];

export default renderEle;
