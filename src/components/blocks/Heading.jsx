function Heading({ load, config }) {
  const { text } = load;
  return (
    <p className="text-white text-2xl font-bold bg-neutral-950 p-4">{text}</p>
  );
}

export default Heading;
