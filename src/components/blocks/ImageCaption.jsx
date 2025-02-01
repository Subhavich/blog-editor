function ImageCaption({ load, config }) {
  const { img, text } = load;
  const { align, bg } = config;
  return (
    <div
      style={{
        backgroundColor: bg,
        display: "flex",
        flexDirection: "column",
        alignItems:
          align === "center" ? "center" : align === "left" ? "start" : "end",
        color: bg === "black" ? "white" : "black",
      }}
    >
      <img className=" max-w-2xs" src={img} />
      <p className="text-zinc-400 italic">{text}</p>
    </div>
  );
}

export default ImageCaption;
