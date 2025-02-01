function ImageCaption({ load, config }) {
  const { img, text } = load;
  const { align, bg } = config;
  return (
    <div style={{ backgroundColor: bg }}>
      <img className=" max-w-2xs" src={img} />
      <p className="text-zinc-400 italic">{text}</p>
    </div>
  );
}

export default ImageCaption;
