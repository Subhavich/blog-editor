import { useState, useRef } from "react";
import { AiOutlinePlus, AiOutlinePlusCircle } from "react-icons/ai";
const HeaderImageEditor = ({ headerPicture, setHeaderPicture }) => {
  const [preview, setPreview] = useState(headerPicture ? headerPicture : null);
  const imageRef = useRef();

  const handleChangeImg = (e) => {
    if (e.target.files && e.target.files[0]) {
      const imageUrl = URL.createObjectURL(e.target.files[0]);
      setPreview(imageUrl);
      setHeaderPicture(imageUrl);
    }
  };

  return (
    <>
      <div className="flex items-center border p-2">
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
              src={preview ? preview : headerPicture}
              alt="Preview"
            />
            <div className=" flex text-white items-center justify-center z-10 size-24 backdrop-brightness-75  absolute">
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
    </>
  );
};

export default HeaderImageEditor;
