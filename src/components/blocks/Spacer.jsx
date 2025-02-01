function Spacer(load) {
  const { config } = load;
  const { align, bg } = config;

  return (
    <div
      style={{
        backgroundColor: bg,
        textAlign: align,
      }}
    >
      <hr
        className="mx-2"
        style={{ color: bg === "black" ? "white" : "black" }}
      />
    </div>
  );
}
export default Spacer;
