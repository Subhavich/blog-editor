// Updated Result component to use editors state instead of mockBlog
import renderEle from "../../blocks/Outlet";
import { mockMembers } from "../../../Data";

function Result({ editors, screenWidth, headerPicture, selectedMember }) {
  return (
    <div className=" leading-relaxed sm:leading-loose p-4 mt-8 text-xs sm:text-base ">
      <h2 className="text-xl font-bold  mb-4">Preview Screen</h2>
      <div
        className={`border-neutral-700 bg-white ${screenWidth} rounded-lg border-8 `}
      >
        <HeaderImage url={headerPicture} />
        <WriterDetail selectedMember={selectedMember} />
        {editors.length > 0 ? (
          editors.map((ele, index) => (
            <div
              className={`overflow-clip ${ele.visible ? "" : "hidden"}`}
              key={index}
            >
              {renderEle(ele.type, ele.load, ele.config)}
            </div>
          ))
        ) : (
          <p className="text-gray-500 p-8 text-lg">No elements added yet.</p>
        )}
      </div>
    </div>
  );
}

export default Result;

function HeaderImage({ url }) {
  return (
    <img src={url} className="object-center object-cover max-h-64 w-dvw" />
  );
}

function WriterDetail({ selectedMember }) {
  const targetedMember = mockMembers.find(
    (member) => member.name === selectedMember
  );

  return (
    <div className="my-4 px-4 xs:px-0 w-full justify-center flex">
      {targetedMember ? <MemberCard member={targetedMember} /> : <p>anon</p>}
    </div>
  );
}
function MemberCard({ member }) {
  const { position, name, image, desc } = member;
  return (
    <div className="flex sm:flex-row items-center bg-white shadow-lg rounded-xl px-2 py-4 gap-4  xs:w-full max-w-sm sm:max-w-md mx-auto">
      {/* Rounded Image */}
      <img
        src={image}
        alt={name}
        className=" w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-full border border-gray-300"
      />

      {/* Member Info */}
      <div className="flex flex-col text-center sm:text-left">
        <span className="block text-base xs:text-lg font-semibold text-gray-900">
          {name}
        </span>
        <span className="block text-xs xs:text-sm text-gray-600">
          {position}
        </span>
        <p className="mt-1 hidden sm:visible  sm:mt-2 text-xs text-gray-500">
          {desc}
        </p>
      </div>
    </div>
  );
}
