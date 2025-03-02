import { useState, useRef, useEffect } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";

const HeaderImageEditor = ({ headerPicture, setHeaderPicture }) => {
  const [file, setFile] = useState(headerPicture || null);
  const [preview, setPreview] = useState(null);
  const imageRef = useRef();

  useEffect(() => {
    // Ensure the headerPicture is a valid File before generating a preview
    if (file instanceof File) {
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);

      // Cleanup the object URL to prevent memory leaks
      return () => URL.revokeObjectURL(objectUrl);
    } else {
      setPreview(headerPicture); // If it's a URL, use it directly
    }
  }, [file, headerPicture]);

  const handleChangeImg = (e) => {
    if (e.target.files && e.target.files[0]) {
      const newFile = e.target.files[0];
      setFile(newFile); // Store the actual file
      setHeaderPicture(newFile); // Pass the file to parent state
    }
  };

  return (
    <div className="flex mb-2 items-center border p-2">
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
      <p className="text-center grow">Add Header Image</p>
    </div>
  );
};

export default HeaderImageEditor;
