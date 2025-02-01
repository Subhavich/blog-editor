function Heading({ load, config }) {
  const { text } = load;
  const { align, bg } = config;
  return (
    <p
      style={{
        backgroundColor: bg,
        textAlign: align,
        color: bg === "black" ? "white" : "black",
      }}
      className="text-white text-2xl font-bold p-4"
    >
      {text}
    </p>
  );
}

export default Heading;
