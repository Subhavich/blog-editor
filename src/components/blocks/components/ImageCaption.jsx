import { useState, useEffect } from "react";
function ImageCaption({ load, config }) {
  const { img, text } = load;
  const { align, bg, width } = config;
  const [imageSrc, setImageSrc] = useState(null);
  useEffect(() => {
    if (img instanceof File) {
      // Convert file to URL
      const objectUrl = URL.createObjectURL(img);
      setImageSrc(objectUrl);

      // Cleanup when component unmounts
      return () => URL.revokeObjectURL(objectUrl);
    } else if (typeof img === "string") {
      // If it's already a URL (e.g., preloaded image)
      setImageSrc(img);
    } else {
      setImageSrc(null);
    }
  }, [img]);

  return (
    <div
      className="p-4"
      style={{
        backgroundColor: bg,
        display: "flex",
        flexDirection: "column",
        alignItems:
          align === "center" ? "center" : align === "left" ? "start" : "end",
        color: bg === "black" ? "white" : "black",
      }}
    >
      <img
        className=""
        src={imageSrc}
        style={{
          width: width ? (isNaN(width) ? width : `${width}px`) : "auto",
          height: "auto",
          objectFit: "cover", // ✅ Ensures image scales up
          imageRendering: "auto", // ✅ Allows upscaling while compromising quality
        }}
      />
      <p
        className="text-zinc-400 italic "
        style={{
          textAlign:
            align === "center" ? "center" : align === "left" ? "left" : "right",
        }}
      >
        {text}
      </p>
    </div>
  );
}

export default ImageCaption;
