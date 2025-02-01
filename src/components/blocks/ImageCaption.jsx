function ImageCaption({ load, config }) {
  const { img, text } = load;
  const { align, bg, width } = config;
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
        src={img}
        style={{
          width: width ? (isNaN(width) ? width : `${width}px`) : "auto",
          height: "auto",
          objectFit: "cover", // ✅ Ensures image scales up
          imageRendering: "auto", // ✅ Allows upscaling while compromising quality
        }}
      />
      <p className="text-zinc-400 italic">{text}</p>
    </div>
  );
}

export default ImageCaption;
