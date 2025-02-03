import TextInput from "./components/TextInput";
import HeadInput from "./components/HeadInput";
import ImageInput from "./components/ImageInput";
import ArrayInput from "./components/ArrayInput";
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
    <div className="mb-2 text-xs">
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
