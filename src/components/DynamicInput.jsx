import { useState, useRef } from "react";

function DynamicInput({ index, label, value, dispatch, config }) {
  const handleChange = (e) => {
    dispatch({
      type: "UPDATE_EDITOR",
      index,
      key: label,
      value: e.target.value,
    });
  };

  return (
    <div className="mb-2">
      {!label === "placehold" && (
        <label className="block font-semibold">{label}:</label>
      )}
      {(() => {
        switch (label) {
          case "placehold":
            return <p>Not Editable</p>;
          case "text":
            return <TextInput onChange={handleChange} value={value} />;
          case "head":
            return <HeadInput value={value} onChange={handleChange} />;
          case "img":
            return (
              <ImageInput
                value={value}
                index={index}
                label={label}
                dispatch={dispatch}
                width={config.width}
              />
            );
          case "array":
            return (
              <ArrayInput
                value={value}
                index={index}
                label={label}
                dispatch={dispatch}
              />
            );

          default:
            return null;
        }
      })()}
    </div>
  );
}

export default DynamicInput;

const TextInput = ({ value, onChange }) => {
  return (
    <textarea
      value={value}
      onChange={onChange}
      className="bg-white border p-2 w-full resize-none"
    />
  );
};

const HeadInput = ({ value, onChange }) => {
  return (
    <input
      value={value}
      onChange={onChange}
      className="bg-white border p-2 w-full"
    />
  );
};

const ImageInput = ({ value, index, label, dispatch, width }) => {
  const [preview, setPreview] = useState(value || null);
  const imageRef = useRef();
  const scaleRef = useRef();

  const handleChangeImg = (e) => {
    if (e.target.files && e.target.files[0]) {
      const imageUrl = URL.createObjectURL(e.target.files[0]);
      setPreview(imageUrl);
      dispatch({
        type: "UPDATE_EDITOR",
        index,
        key: label,
        value: imageUrl,
      });
    }
  };

  const handleWidthChange = (e) => {
    dispatch({
      type: "UPDATE_EDITOR",
      index,
      key: "config",
      value: { width: scaleRef.current.value },
    });
  };

  return (
    <>
      <input
        onChange={handleWidthChange}
        type="range"
        value={width}
        min={150}
        max={750}
        step={10}
        ref={scaleRef}
      />
      <input
        type="file"
        ref={imageRef}
        accept="image/*"
        onChange={handleChangeImg}
        className="hidden"
      />
      {preview ? (
        <div
          onClick={() => imageRef.current.click()}
          className="size-24 relative cursor-pointer"
        >
          <img
            className="size-24 object-cover absolute"
            src={preview}
            alt="Preview"
          />
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
  );
};

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
