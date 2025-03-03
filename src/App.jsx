import { useReducer, useRef, useState, useEffect } from "react";
import Sidebar from "./components/app/Sidebar";
import MainContent from "./components/app/MainContent";
import { use } from "react";

function reducer(state, action) {
  switch (action.type) {
    case "ADD_EDITOR":
      return [...state, action.payload];
    case "UPDATE_EDITOR":
      return state.map((editor, index) => {
        if (index !== action.index) return editor;

        let updatedEditor = { ...editor };

        switch (action.key) {
          case "expanded":
            updatedEditor.expanded = action.value;
            break;

          case "config":
            updatedEditor.config = { ...editor.config, ...action.value };
            break;

          case "visible":
            updatedEditor.visible = action.value;
            break;

          default:
            updatedEditor.load = { ...editor.load, [action.key]: action.value };
            break;
        }

        return updatedEditor;
      });

    case "REORDER_EDITOR":
      const targetInd = action.index;
      const finalInd = action.index + action.increment;
      const canSwitch = finalInd >= 0 && finalInd < state.length;
      if (!canSwitch) {
        return state;
      }
      const targetValue = {
        ...state[targetInd],
        config: { ...state[targetInd].config },
      };
      const finalValue = {
        ...state[finalInd],
        config: { ...state[finalInd].config },
      };
      return state.map((editor, index) => {
        if (index === targetInd) {
          return finalValue;
        }
        if (index === finalInd) {
          return targetValue;
        }
        return { ...editor, config: { ...editor.config } };
      });

    case "DELETE_EDITOR":
      return state.filter((_, index) => index !== action.index);

    default:
      return state;
  }
}

async function createFormData(metadata, content) {
  const formData = new FormData();

  // Convert metadata to string (headerPicture is stored separately)
  formData.append(
    "metadata",
    JSON.stringify({
      title: metadata.title,
      selectedMember: metadata.selectedMember,
      headerPicture:
        metadata.headerPicture instanceof File
          ? "headerImage"
          : metadata.headerPicture,
    })
  );

  // Prepare content: Replace image files with `imageId`
  const processedContent = content.map((block, index) => {
    if (block.type === "imageCaption" && block.load.img instanceof File) {
      const fileKey = `image-${index}`;
      formData.append(fileKey, block.load.img); // Attach file separately
      return { ...block, load: { ...block.load, img: fileKey } }; // Replace img with imageId
    }
    return block;
  });

  // Append processed content
  formData.append("content", JSON.stringify(processedContent));

  // Append header image if it's a file
  if (metadata.headerPicture instanceof File) {
    formData.append("headerImage", metadata.headerPicture);
  }

  return formData;
}

function App() {
  const [editors, dispatch] = useReducer(reducer, []);
  const [screenWidth, setScreenWidth] = useState("max-w-96");
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 600);
  const [headerPicture, setHeaderPicture] = useState(
    "https://picsum.photos/1024?grayscale&.webp"
  );
  const [title, setTitle] = useState(
    "What to See in Batman, Turkey: A Travel Guide"
  );
  const [selectedMember, setSelectedMember] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [unpro, setUnpro] = useState(undefined);
  const [pro, setPro] = useState(undefined);

  useEffect(() => {
    console.log(editors);
    console.log({
      metadata: {
        title,
        headerPicture,
        selectedMember,
      },
      content: editors,
    });
  }, [editors, headerPicture, title]);

  useEffect(() => {
    async function loadData() {
      try {
        const response = await fetch("http://localhost:5000/blog/");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();
        console.log(result);
        const bro = mapDatabaseImages(result[1]);
        console.log(result[1], " vs ", bro);

        return null;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    loadData();
  }, []); // Dependency array ensures it runs only once on mount

  const handleSaveBlog = async () => {
    setIsSubmitting(true);
    try {
      const formData = await createFormData(
        { title, headerPicture, selectedMember },
        editors
      );

      const response = await fetch("http://localhost:5000/blog/", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      console.log("📥 Received Response:", result);
      alert("Blog saved successfully!");
    } catch (error) {
      console.error("❌ Error saving blog:", error);
      alert("Failed to save blog.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex sm:flex-row relative flex-col font-mono">
      <FloatingOpener
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      <Sidebar
        headerPicture={headerPicture}
        setHeaderPicture={setHeaderPicture}
        setSelectedMember={setSelectedMember}
        editors={editors}
        dispatch={dispatch}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        setTitle={setTitle}
        title={title}
        screenWidth={screenWidth}
      />
      <MainContent
        editors={editors}
        selectedMember={selectedMember}
        screenWidth={screenWidth}
        setScreenWidth={setScreenWidth}
        isSidebarOpen={isSidebarOpen}
        headerPicture={headerPicture}
        title={title}
      />

      {/* Save Blog Button */}
      <button
        onClick={handleSaveBlog}
        disabled={isSubmitting}
        className="fixed bottom-4 right-4 px-6 py-3 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 disabled:opacity-50"
      >
        {isSubmitting ? "Saving..." : "Save Blog"}
      </button>
    </div>
  );
}

export default App;

function FloatingOpener({ isSidebarOpen, setIsSidebarOpen }) {
  return (
    <div
      className={`${
        isSidebarOpen && "hidden"
      } flex justify-center text-white font-bold bg-gray-700 w-24 sm:hidden absolute top-2 text-lg right-2 pb-2 pt-1 `}
      onClick={() => setIsSidebarOpen((pv) => !pv)}
    >
      <p className="p-2">Edit</p>
    </div>
  );
}

function mapDatabaseImages(blog) {
  if (!blog.databaseImages) return blog; // If no images to map, return as is.

  const { databaseImages } = blog;

  // Map header image
  const updatedMetadata = {
    ...blog.metadata,
    headerPicture:
      databaseImages[blog.metadata.headerPicture] ||
      blog.metadata.headerPicture,
  };

  // Map content images
  const updatedContent = blog.content.map((block) => {
    if (block.type === "imageCaption" && databaseImages[block.load.img]) {
      return {
        ...block,
        load: {
          ...block.load,
          img: databaseImages[block.load.img], // Replace with actual image URL
        },
      };
    }
    return block;
  });

  return {
    ...blog,
    metadata: updatedMetadata,
    content: updatedContent,
  };
}
