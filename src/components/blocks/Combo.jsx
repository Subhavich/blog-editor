function Combo({ load, config }) {
  const { head, text } = load;
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
      className="p-4 "
    >
      <p className="text-2xl text-center">{head}</p>
      <p className="text-base text-center">{text}</p>
    </div>
  );
}

export default Combo;
