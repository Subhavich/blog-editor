import Result from "./maincontent/Results";
import { screenOptions } from "../../Data";
import { useMode } from "../../context/mode-context";

function MainContent({
  editors,
  screenWidth,
  setScreenWidth,
  isSidebarOpen,
  headerPicture,
  selectedMember,
  title,
}) {
  return (
    <div
      className={`flex-1 min-h-screen mx-auto bg-gray-200 transition-all duration-300 ${
        isSidebarOpen ? "sm:ml-84" : "sm:ml-12"
      } p-4`}
    >
      <ScreenOptions
        screenWidth={screenWidth}
        setScreenWidth={setScreenWidth}
      />
      <Result
        title={title}
        headerPicture={headerPicture}
        editors={editors}
        screenWidth={screenWidth}
        selectedMember={selectedMember}
      />
    </div>
  );
}

export default MainContent;

function ScreenOptions({ setScreenWidth, screenWidth }) {
  return (
    <div className="hidden justify-center mx-auto sm:flex space-x-8">
      {screenOptions.map((opt) => (
        <button
          key={opt.label}
          value={opt.value}
          onClick={() => setScreenWidth(opt.value)}
          className={`text-xs cursor-pointer px-1 py-0.5 ${
            screenWidth === opt.value
              ? "scale-125 bg-neutral-950 text-white"
              : ""
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
