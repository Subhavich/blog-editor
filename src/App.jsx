import { useReducer, useRef, useEffect } from "react";
import options from "./Data";

// Reducer function to manage the editors state
function reducer(state, action) {
  switch (action.type) {
    case "ADD_EDITOR":
      return [...state, action.payload];

    case "UPDATE_EDITOR":
      return state.map((editor, index) =>
        index === action.index
          ? { ...editor, load: { ...editor.load, [action.key]: action.value } }
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

  const handleAddEditor = () => {
    const selectedOption = selectRef.current.selectedOptions[0];
    const newEditor = {
      type: selectedOption.getAttribute("data-type"),
      load: JSON.parse(selectedOption.getAttribute("data-load")),
      config: { align: "left", bg: "white" },
    };

    dispatch({ type: "ADD_EDITOR", payload: newEditor });
  };

  useEffect(() => {
    console.log(editors);
  }, [editors]);

  return (
    <>
      <p className="text-center block py-2">EDITORs</p>

      <main className="mx-auto max-w-screen-sm mb-4">
        <div className="space-y-4 mb-4">
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
        </div>
        <div className="flex space-x-2">
          <select ref={selectRef} className="border p-2">
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
            className="border px-2 hover:bg-green-200 transition-all"
          >
            Add Element
          </button>
        </div>
      </main>
      <Result editors={editors} />
    </>
  );
}

export default App;

// Component that renders dynamic input fields based on load keys
function EditorForm({ index, type, load, dispatch }) {
  return (
    <div className="p-2 border rounded shadow-sm">
      <div className="flex start space-x-4 items-center">
        <p className="text-lg font-bold">{type.toUpperCase()}</p>
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
            {"<"}
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
            {">"}
          </span>
        </div>
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

function GeneralSelectors({ option, dispatch }) {}
// Renders appropriate input based on the key and updates the state on change
function DynamicInput({ index, label, value, dispatch }) {
  const handleChange = (e) => {
    dispatch({
      type: "UPDATE_EDITOR",
      index,
      key: label,
      value: e.target.value,
    });
  };

  const handleChangeImg = (e) => {
    dispatch({
      type: "UPDATE_EDITOR",
      index,
      key: label,
      value: e.target.files ? URL.createObjectURL(e.target.files[0]) : "",
    });
  };

  return (
    <div className="mb-2">
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
        <input
          onChange={handleChangeImg}
          type="file"
          className="border p-2 w-full"
        />
      ) : null}
    </div>
  );
}

function Header({ load, config }) {
  const { text } = load;
  return (
    <p className="text-white text-2xl font-bold bg-neutral-950 p-4">{text}</p>
  );
}

function Combo({ load, config }) {
  const { head, text } = load;
  const { align, bg } = config;

  return (
    <div style={{ backgroundColor: bg }} className="p-4">
      <p className="text-2xl text-center">{head}</p>
      <p className="text-base text-center">{text}</p>
    </div>
  );
}

function ImageCaption({ load, config }) {
  const { img, text } = load;
  return (
    <div>
      <img className=" max-w-2xs" src={img} />
      <p className="text-zinc-400 italic">{text}</p>
    </div>
  );
}

function renderEle(type, load, config) {
  switch (type) {
    case "header":
      return <Header load={load} config={config} />;
    case "combo":
      return <Combo load={load} config={config} />;
    case "imageCaption":
      return <ImageCaption load={load} config={config} />;
    default:
      return null;
  }
}

// Updated Result component to use editors state instead of mockBlog
function Result({ editors }) {
  return (
    <div className="p-4 border-t mt-8">
      <h2 className="text-xl font-bold mb-4">Rendered Elements:</h2>
      {editors.length > 0 ? (
        editors.map((ele, index) => (
          <div key={index}>{renderEle(ele.type, ele.load, ele.config)}</div>
        ))
      ) : (
        <p className="text-gray-500">No elements added yet.</p>
      )}
    </div>
  );
}
