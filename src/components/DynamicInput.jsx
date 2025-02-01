import { useState, useRef } from "react";

function DynamicInput({ index, label, value, dispatch }) {
  const [preview, setPreview] = useState(value || null);
  const imageRef = useRef();
  const arrayRef = useRef();
  const handleChange = (e) => {
    dispatch({
      type: "UPDATE_EDITOR",
      index,
      key: label,
      value: e.target.value,
    });
  };

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

  const handleArrayChange = (e) => {
    const arrayValues = arrayRef.current.value
      .split(",")
      .map((item) => item.trim()); // Convert input to array
    dispatch({
      type: "UPDATE_EDITOR",
      index,
      key: label,
      value: arrayValues,
    });
  };

  return (
    <div className="mb-2">
      <label className="block font-semibold">{label}:</label>

      {(() => {
        switch (label) {
          case "text":
            return (
              <textarea
                value={value}
                onChange={handleChange}
                className="bg-white border p-2 w-full resize-none"
              />
            );

          case "head":
            return (
              <input
                type="text"
                value={value}
                onChange={handleChange}
                className="bg-white border p-2 w-full"
              />
            );

          case "img":
            return (
              <>
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

          case "array":
            return (
              <div className="flex">
                <textarea
                  type="text"
                  ref={arrayRef}
                  className="bg-white border p-2 w-full"
                  placeholder="Enter comma-separated values"
                />
                <button
                  className="border cursor-pointer p-1"
                  onClick={handleArrayChange}
                >
                  Make Array
                </button>
              </div>
            );

          default:
            return null;
        }
      })()}
    </div>
  );
}

export default DynamicInput;
