const HeadInput = ({ value, onChange }) => {
  return (
    <input
      value={value}
      onChange={onChange}
      className="bg-white border p-2 w-full"
    />
  );
};

export default HeadInput;
