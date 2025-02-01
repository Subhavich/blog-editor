import { useState, useRef } from "react";
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
          className="bg-white border p-2 w-full resize-none"
        />
      ) : label === "head" ? (
        <input
          type="text"
          value={value}
          onChange={handleChange}
          className="bg-white  border p-2 w-full"
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

export default DynamicInput;
