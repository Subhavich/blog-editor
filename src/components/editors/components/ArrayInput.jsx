import { useRef } from "react";
const ArrayInput = ({ value, index, label, dispatch }) => {
  const arrayRef = useRef();

  const handleArrayChange = () => {
    const arrayValues = arrayRef.current.value
      .split(",") // Split input by commas
      .map((item) => item.trim()) // Trim extra spaces
      .filter((item) => item !== ""); // Remove empty values

    dispatch({
      type: "UPDATE_EDITOR",
      index,
      key: label,
      value: arrayValues,
    });
  };

  return (
    <div className="flex">
      <textarea
        type="text"
        ref={arrayRef}
        className="bg-white border p-2 w-full"
        placeholder="Enter comma-separated values"
      />
      <button
        className="border cursor-pointer p-1 bg-gray-200 hover:bg-gray-300 transition-all"
        onClick={handleArrayChange} // Button click triggers update
      >
        Make Array
      </button>
    </div>
  );
};

export default ArrayInput;
