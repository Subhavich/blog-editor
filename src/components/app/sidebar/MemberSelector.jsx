import { mockMembers } from "../../../Data";
const MemberSelector = ({ setSelectedMember }) => {
  return (
    <select
      onChange={(e) => setSelectedMember(e.target.value)}
      className="bg-white p-2 border mb-2 w-full cursor-pointer"
    >
      <option value={null}>-- select team member --</option>
      {mockMembers.map((opt, ind) => (
        <option key={ind} value={opt.value}>
          {opt.name}
        </option>
      ))}
    </select>
  );
};
export default MemberSelector;
