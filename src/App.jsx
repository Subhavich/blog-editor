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
  const [screenWidth, setScreenWidth] = useState("max-w-[1024px]");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [headerPicture, setHeaderPicture] = useState(
    "https://picsum.photos/1024?grayscale&.webp"
  );
  const [selectedMember, setSelectedMember] = useState(null);

  useEffect(() => {
    console.log(editors);
  }, [editors]);

  return (
    <div className="flex font-mono">
      <Sidebar
        headerPicture={headerPicture}
        setHeaderPicture={setHeaderPicture}
        setSelectedMember={setSelectedMember}
        editors={editors}
        dispatch={dispatch}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <MainContent
        editors={editors}
        selectedMember={selectedMember}
        screenWidth={screenWidth}
        setScreenWidth={setScreenWidth}
        isSidebarOpen={isSidebarOpen}
        headerPicture={headerPicture}
      />
    </div>
  );
}

export default App;
