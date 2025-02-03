function Heading({ load, config }) {
  console.log("HEADING LOAD ", load);
  const { text } = load;
  const { align, bg } = config;
  return (
    <p
      style={{
        backgroundColor: bg,
        textAlign: align,
        color: bg === "black" ? "white" : "black",
      }}
      className="text-white text-2xl font-bold pt-8 p-4"
    >
      {text}
    </p>
  );
}

export default Heading;
