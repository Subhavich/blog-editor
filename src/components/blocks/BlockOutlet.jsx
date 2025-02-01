import ImageCaption from "./ImageCaption";
import Heading from "./Heading";
import Combo from "./Combo";
import Paragraph from "./Paragraph";
import Spacer from "./Spacer";
import List from "./List";

function renderEle(type, load, config) {
  console.log(type, load);
  switch (type) {
    case "heading":
      return <Heading load={load} config={config} />;
    case "combo":
      return <Combo load={load} config={config} />;
    case "imageCaption":
      return <ImageCaption load={load} config={config} />;
    case "paragraph":
      return <Paragraph load={load} config={config} />;
    case "spacer":
      return <Spacer load={load} config={config} />;
    case "list":
      return <List load={load} config={config} />;
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
      text: "Batman, Turkey",
    },
    label: "Image with Caption",
  },
  {
    type: "spacer",
    load: { placehold: "mockery" },
    label: "Spacer",
  },
  {
    type: "combo",
    load: { head: "add heading here", text: "add long text here" },
    label: "Combo",
  },
  {
    type: "list",
    load: { head: "", array: [] },
    label: "List",
  },
];

export default renderEle;
