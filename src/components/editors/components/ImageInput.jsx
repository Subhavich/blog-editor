import { useState, useRef, useEffect } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";

const ImageInput = ({ value, index, label, dispatch, width }) => {
  const [file, setFile] = useState(value || null);
  const [preview, setPreview] = useState(null);
  const imageRef = useRef();
  const scaleRef = useRef();

  useEffect(() => {
    // If value is a File, generate preview
    if (value instanceof File) {
      const objectUrl = URL.createObjectURL(value);
      setPreview(objectUrl);

      // Cleanup to avoid memory leaks
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [value]);

  const handleChangeImg = (e) => {
    if (e.target.files && e.target.files[0]) {
      const newFile = e.target.files[0];
      setFile(newFile);

      // Create preview URL
      const objectUrl = URL.createObjectURL(newFile);
      setPreview(objectUrl);

      dispatch({
        type: "UPDATE_EDITOR",
        index,
        key: label,
        value: newFile, // Store actual File object
      });

      // Cleanup previous object URL
      return () => URL.revokeObjectURL(objectUrl);
    }
  };

  const handleWidthChange = () => {
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
          <div className="flex text-white items-center justify-center z-10 size-24 backdrop-brightness-75 absolute">
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
