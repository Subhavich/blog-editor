import ImageCaption from "./ImageCaption";
import Heading from "./Heading";
import Combo from "./Combo";

function renderEle(type, load, config) {
  switch (type) {
    case "heading":
      return <Heading load={load} config={config} />;
    case "combo":
      return <Combo load={load} config={config} />;
    case "imageCaption":
      return <ImageCaption load={load} config={config} />;
    default:
      return null;
  }
}

export default renderEle;

// options.js
// const options = [
//   {
//     type: "combo",
//     load: { head: "", text: "" },
//     label: "Combo",
//   },
//   {
//     type: "header",
//     load: { text: "" },
//     label: "Header",
//   },
//   {
//     type: "imageCaption",
//     load: { img: "", text: "" },
//     label: "Image with Caption",
//   },
// ];

// export default options;
