function Paragraph({ load, config }) {
  const { text } = load;
  const { align, bg } = config;
  return (
    <p
      style={{
        backgroundColor: bg,
        textAlign: align,
        color: bg === "black" ? "white" : "black",
      }}
      className="text-white text-base p-4"
    >
      {text}
    </p>
  );
}

export default Paragraph;
