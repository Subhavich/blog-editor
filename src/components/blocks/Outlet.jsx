import ImageCaption from "./components/ImageCaption";
import Heading from "./components/Heading";
import Combo from "./components/Combo";
import Paragraph from "./components/Paragraph";
import Spacer from "./components/Spacer";
import List from "./components/List";

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
    load: { text: "Batman, Turkey" },
    label: "Heading",
  },
  {
    type: "paragraph",
    load: {
      text: "Batman is connected by highways and railway with the nearby cities of Diyarbakır and Kurtalan and with the capital Ankara. The distance (using highways) to Istanbul is 1,465 km (910 mi), to Ankara 1,012 km (629 mi), and to İzmir 1,520 km (944 mi)",
    },
    label: "Paragraph",
  },
  {
    type: "imageCaption",
    load: {
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Tigris_2015.jpg/1920px-Tigris_2015.jpg",
      text: "The Tigris river in Batman Province.",
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
    load: {
      head: "Early history",
      text: "The Batman Province contains the strategic Tigris River with fertile lands by its sides, as well as rocky hills with numerous caves providing a natural shelter. As a result, it was inhabited from prehistoric times, likely from the Neolithic (Paleolithic)[contradictory] period, according to archeological evidence.",
    },
    label: "Combo",
  },
  {
    type: "list",
    load: {
      head: "Climate",
      array: [
        "Highest recorded temperature:48.8 °C (119.8 °F) on 10 July 1962",
        "Lowest recorded temperature:−24.0 °C (−11.2 °F) on 1 January 2007",
      ],
    },
    label: "List",
  },
];

export default renderEle;
