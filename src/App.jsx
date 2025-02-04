import { useReducer, useRef, useState, useEffect } from "react";
import Sidebar from "./components/app/Sidebar";
import MainContent from "./components/app/MainContent";
// Reducer function to manage the editors state
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

          default: // Handles all other updates (load updates)
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

  useEffect(() => {
    console.log(editors);
  }, [editors]);

  return (
    <div className="flex sm:flex-row relative flex-col  font-mono">
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
