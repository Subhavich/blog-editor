// Updated Result component to use editors state instead of mockBlog
import renderEle from "../../blocks/Outlet";
import { mockMembers } from "../../../Data";
import { useMeasure } from "@uidotdev/usehooks";
import { useEffect } from "react";
import { useMode } from "../../../context/mode-context";
import { clsx } from "clsx";
function Result({ editors, screenWidth, headerPicture, selectedMember }) {
  const { setBoxWidth, isMobile, isTablet, isPC } = useMode();
  const [ref, { width }] = useMeasure();
  useEffect(() => {
    if (!width) {
      return;
    }
    setBoxWidth(width);
  }, [width]);
  return (
    <div
      className={clsx(
        "p-4 mt-8",
        isMobile && "leading-loose text-xs",
        isTablet && "leading-relaxed text-base",
        isPC && "leading-relaxed text-base"
      )}
    >
      <h2 className="text-xl font-bold  mb-4">Preview Screen</h2>
      <div
        ref={ref}
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
  const { isMobile, isPC, isTablet, boxWidth } = useMode();
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
        <span
          className={clsx(
            " block font-semibold text-gray-900 ",
            isMobile && "text-base",
            isTablet && "text-2xl",
            isPC && "text-2xl"
          )}
        >
          {name}
        </span>
        <span
          className={clsx(
            " block  text-gray-600",
            isMobile && "mt-1 text-xs",
            isPC || (isTablet && "mt-2 text-sm")
          )}
        >
          {position}
        </span>
        <p
          className={clsx(
            "   text-gray-500",
            isMobile && "mt-1 text-xs",
            isPC || (isTablet && "mt-2 text-sm")
          )}
        >
          {desc}
        </p>
      </div>
    </div>
  );
}
