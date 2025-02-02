import {
  AiFillCaretDown,
  AiFillCaretUp,
  AiOutlineDelete,
  AiOutlineEye,
} from "react-icons/ai";
import { alignmentOptions, bgOptions } from "../../../Data";
import DynamicInput from "./DynamicInput";
function EditorForm({
  index,
  type,
  load,
  dispatch,
  expanded,
  config,
  visible,
}) {
  console.log(visible);
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
          <AiOutlineDelete className="cursor-pointer" size={24} />
        </button>
        <button
          onClick={() =>
            dispatch({
              type: "UPDATE_EDITOR",
              index,
              key: "visible",
              value: !visible,
            })
          }
        >
          <AiOutlineEye
            className="cursor-pointer hover:text-green-400 transition-all"
            size={24}
            style={{ color: visible ? "green" : "red" }}
          />
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
            {/* Color/Align */}
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
            {load &&
              Object.keys(load).map((key) =>
                key !== "expanded" ? (
                  <DynamicInput
                    key={key}
                    index={index}
                    label={key}
                    value={load[key]}
                    dispatch={dispatch}
                    config={config}
                  />
                ) : null
              )}
          </div>
        </>
      )}
    </div>
  );
}

export default EditorForm;
