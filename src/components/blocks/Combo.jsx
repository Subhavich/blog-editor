function Combo({ load, config }) {
  const { head, text } = load;
  const { align, bg } = config;

  return (
    <div style={{ backgroundColor: bg }} className="p-4">
      <p className="text-2xl text-center">{head}</p>
      <p className="text-base text-center">{text}</p>
    </div>
  );
}

export default Combo;
