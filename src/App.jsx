import { useReducer, useRef, useState, useEffect } from "react";
import { alignmentOptions, bgOptions, screenOptions } from "./Data";
import { options } from "./components/blocks/BlockOutlet";
import {
  AiFillCaretDown,
  AiFillCaretUp,
  AiOutlineDelete,
} from "react-icons/ai";
import DynamicInput from "./components/DynamicInput";
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
                  ? editor.load // Prevent modifying `load` when updating `config`
                  : { ...editor.load, [action.key]: action.value },
              config:
                action.key === "config"
                  ? { ...editor.config, ...action.value } // Properly update `config`
                  : editor.config,
              expanded:
                action.key === "expanded" ? action.value : editor.expanded,
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
        <div className="w-full mx-auto flex space-x-8 ">
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

// Component that renders dynamic input fields based on load keys
function EditorForm({ index, type, load, dispatch, expanded }) {
  console.log("expanded is ", expanded, !expanded);
  const handleConfigChange = (e, arg) => {
    dispatch({
      type: "UPDATE_EDITOR",
      index,
      key: "config",
      value: { ...load.config, [arg]: e.target.value },
    });
  };

  return (
    <div className=" p-2 border rounded shadow-sm">
      <div
        className={` ${
          expanded ? "mb-1" : ""
        } flex justify-between space-x-4 items-center `}
      >
        <button
          onClick={() => dispatch({ type: "DELETE_EDITOR", index })}
          className="text-rose-800 transition-all"
        >
          <AiOutlineDelete size={24} />
        </button>

        {/* Expand/Collapse Title */}
        <p
          onClick={() =>
            dispatch({
              type: "UPDATE_EDITOR",
              index,
              key: "expanded",
              value: !expanded,
            })
          }
          className="cursor-pointer text-lg font-bold flex-1 text-center"
        >
          {type.toUpperCase()}
        </p>

        {/* up-down btn */}
        <div className="flex space-x-2">
          <span
            className="cursor-pointer text-lg font-bold"
            onClick={() =>
              dispatch({
                type: "REORDER_EDITOR",
                index,
                increment: -1,
              })
            }
          >
            <AiFillCaretUp />
          </span>
          <span
            className="cursor-pointer text-lg font-bold"
            onClick={() =>
              dispatch({
                type: "REORDER_EDITOR",
                index,
                increment: 1,
              })
            }
          >
            <AiFillCaretDown />
          </span>
        </div>
      </div>
      {expanded && (
        <>
          <hr className="mb-2" />
          <div className="flex flex-col space-y-2">
            <div className="flex space-x-2 mt-2">
              <select
                className="bg-white p-1"
                onChange={(e) => handleConfigChange(e, "align")}
              >
                {alignmentOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <select
                className="bg-white p-1"
                onChange={(e) => handleConfigChange(e, "bg")}
              >
                {bgOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
            {Object.keys(load).map((key) =>
              key !== "expanded" ? (
                <DynamicInput
                  key={key}
                  index={index}
                  label={key}
                  value={load[key]}
                  dispatch={dispatch}
                />
              ) : null
            )}
          </div>
        </>
      )}
    </div>
  );
}
