import { useReducer, useRef, useState, useEffect } from "react";
import { screenOptions } from "./Data";
import { options } from "./components/blocks/BlockOutlet";
import EditorForm from "./components/EditorForm";
import Result from "./components/Results";
// Reducer function to manage the editors state
function reducer(state, action) {
  switch (action.type) {
    case "ADD_EDITOR":
      return [...state, action.payload];

    case "UPDATE_EDITOR":
      return state.map((editor, index) =>
        index === action.index
          ? {
              ...editor,
              load:
                action.key === "config"
                  ? { ...editor.load }
                  : { ...editor.load, [action.key]: action.value },
              config:
                action.key === "config"
                  ? { ...editor.config, ...action.value }
                  : { ...editor.config },
              expanded:
                action.key === "expanded" ? action.value : editor.expanded, // ✅ Always update expanded separately
            }
          : editor
      );
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
  const selectRef = useRef();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleAddEditor = () => {
    const selectedOption = selectRef.current.selectedOptions[0];
    const newEditor = {
      type: selectedOption.getAttribute("data-type"),
      load: JSON.parse(selectedOption.getAttribute("data-load")),
      config: { align: "left", bg: "white" },
      expanded: true,
    };

    dispatch({ type: "ADD_EDITOR", payload: newEditor });
  };

  //TEST
  useEffect(() => {
    console.log(editors);
  }, [editors]);

  return (
    <div className="   flex font-mono">
      {/* Sticky Sidebar */}
      <div
        className={`bg-neutral-200   fixed  left-0 top-0 h-screen  shadow-lg  transition-all overflow-y-auto duration-300 ${
          isSidebarOpen ? "w-84" : "w-12"
        }`}
      >
        {/* Toggle Button */}
        <button
          className="w-full text-white text-2xl bg-gray-700 p-2 text-center font-bold"
          onClick={() => setIsSidebarOpen((prev) => !prev)}
        >
          {isSidebarOpen ? "<<" : ">>"}
        </button>

        {/* Sidebar Content */}
        {isSidebarOpen && (
          <div className="pl-2 pr-8">
            <p className="text-center block py-2 text-lg">EDITORs</p>
            {/* Editor Form Map */}
            <main className="space-y-4 mb-4">
              {editors.map((editor, index) => (
                <EditorForm
                  key={index}
                  index={index}
                  type={editor.type}
                  load={editor.load}
                  dispatch={dispatch}
                  config={editor.config}
                  expanded={editor.expanded}
                />
              ))}
            </main>

            <div className="flex space-x-2 mt-4">
              <select
                ref={selectRef}
                className="bg-white border p-2 text-black"
              >
                {options.map((opt) => (
                  <option
                    key={opt.type}
                    data-type={opt.type}
                    data-load={JSON.stringify(opt.load)}
                    value={opt.type}
                  >
                    {opt.label}
                  </option>
                ))}
              </select>
              <button
                onClick={handleAddEditor}
                className="border px-2 cursor-pointer hover:bg-green-200 transition-all text-black"
              >
                Add Element
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Main Content (Shifts when sidebar opens) */}
      <div
        className={`flex-1 mx-auto ${screenWidth} transition-all duration-300 ${
          isSidebarOpen ? "ml-84" : "ml-12"
        } p-4`}
      >
        <div className="justify-center mx-auto flex space-x-8 ">
          {screenOptions.map((opt) => (
            <button
              key={opt.label}
              value={opt.value}
              onClick={() => setScreenWidth(opt.value)}
              className={`text-xs cursor-pointer px-1 py-0.5 ${
                screenWidth === opt.value
                  ? " scale-125 bg-neutral-950 text-white"
                  : ""
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
        <Result editors={editors} />
      </div>
    </div>
  );
}

export default App;
