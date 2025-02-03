import { useState } from "react";
const TextInput = ({ value, onChange }) => {
  const [expanded, setExpanded] = useState(false);
  const handleToggleExpand = () => {
    setExpanded((pv) => !pv);
  };
  return (
    <div className="flex items-start flex-col space-y-1">
      <p onClick={handleToggleExpand} className="p-0.5 border cursor-pointer">
        Expand Input
      </p>
      <textarea
        value={value}
        rows={expanded ? 15 : 7}
        onChange={onChange}
        className="bg-white border p-2 w-full resize-none"
      />
    </div>
  );
};

export default TextInput;
