import { useState, useRef } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
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
          <div className="flex text-white items-center justify-center z-10 size-24 backdrop-brightness-75  absolute">
            <p className="scale-150 cursor-pointer">
              <AiOutlinePlusCircle />
            </p>
          </div>
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

export default ImageInput;
