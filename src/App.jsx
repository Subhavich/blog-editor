import { useReducer, useRef, useState, useEffect } from "react";
import { alignmentOptions, bgOptions } from "./Data";
import { options } from "./components/blocks/BlockOutlet";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
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

    default:
      return state;
  }
}

function App() {
  const [editors, dispatch] = useReducer(reducer, []);
  const selectRef = useRef();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleAddEditor = () => {
    const selectedOption = selectRef.current.selectedOptions[0];
    const newEditor = {
      type: selectedOption.getAttribute("data-type"),
      load: JSON.parse(selectedOption.getAttribute("data-load")),
      config: { align: "left", bg: "white" },
    };

    dispatch({ type: "ADD_EDITOR", payload: newEditor });
  };

  //TEST
  useEffect(() => {
    console.log(editors);
  }, [editors]);

  return (
    <div className="flex font-mono">
      {/* Sticky Sidebar */}
      <div
        id="me"
        className={`bg-neutral-200  fixed  left-0 top-0 h-screen  shadow-lg  transition-all overflow-y-auto duration-300 ${
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
          <div className="p-4">
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
                className="border px-2 hover:bg-green-200 transition-all text-black"
              >
                Add Element
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Main Content (Shifts when sidebar opens) */}
      <div
        className={`flex-1 transition-all duration-300 ${
          isSidebarOpen ? "ml-84" : "ml-12"
        } p-4`}
      >
        <Result editors={editors} />
      </div>
    </div>
  );
}

export default App;

// Component that renders dynamic input fields based on load keys
function EditorForm({ index, type, load, dispatch }) {
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
      <div className="flex justify-between space-x-4 items-center">
        <p className="text-lg   font-bold">{type.toUpperCase()}</p>
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
      <div className="flex space-x-2">
        <select
          className="bg-white"
          onChange={(e) => handleConfigChange(e, "align")}
        >
          {alignmentOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <select
          className="bg-white"
          onChange={(e) => handleConfigChange(e, "bg")}
        >
          {bgOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
      {Object.keys(load).map((key) => (
        <DynamicInput
          key={key}
          index={index}
          label={key}
          value={load[key]}
          dispatch={dispatch}
        />
      ))}
    </div>
  );
}

function DynamicInput({ index, label, value, dispatch }) {
  const [preview, setPreview] = useState(null);
  const imageRef = useRef();
  const handleChange = (e) => {
    dispatch({
      type: "UPDATE_EDITOR",
      index,
      key: label,
      value: e.target.value,
    });
  };

  const handleChangeImg = (e) => {
    const imageUrl = URL.createObjectURL(e.target.files[0]);
    dispatch({
      type: "UPDATE_EDITOR",
      index,
      key: label,
      value: e.target.files ? URL.createObjectURL(e.target.files[0]) : "",
    });
    setPreview(imageUrl);
  };

  return (
    <div className=" mb-2">
      <label className="block font-semibold">{label}:</label>
      {label === "text" ? (
        <textarea
          value={value}
          onChange={handleChange}
          className="border p-2 w-full resize-none"
        />
      ) : label === "head" ? (
        <input
          type="text"
          value={value}
          onChange={handleChange}
          className="border p-2 w-full"
        />
      ) : label === "img" ? (
        <>
          <input
            onChange={handleChangeImg}
            type="file"
            className="bg-white hidden"
            ref={imageRef}
            accept="image/*"
          />
          {preview ? (
            <div
              onClick={() => imageRef.current.click()}
              className="size-24 relative cursor-pointer"
            >
              <img className=" size-24 object-cover absolute " src={preview} />
              <div className="z-10 size-24 backdrop-brightness-75 absolute"></div>
            </div>
          ) : (
            <div
              onClick={() => imageRef.current.click()}
              className="cursor-pointer flex justify-center items-center bg-white size-24"
            >
              <p>+</p>
            </div>
          )}
        </>
      ) : null}
    </div>
  );
}
