import { useRef } from "react";
import EditorForm from "./sidebar/EditorForm";
import { options } from "../blocks/Outlet";
import HeaderImageEditor from "./sidebar/HeaderEditor";
import MemberSelector from "./sidebar/MemberSelector";
import TitleInput from "./sidebar/TitleInput";
import { useMode } from "../../context/mode-context";
import { clsx } from "clsx";

function Sidebar({
  editors,
  dispatch,
  isSidebarOpen,
  setIsSidebarOpen,
  headerPicture,
  setHeaderPicture,
  setSelectedMember,
  title,
  setTitle,
}) {
  const selectRef = useRef();

  const handleAddEditor = () => {
    if (selectRef.current.value === "placeholder") {
      return;
    }
    const selectedOption = selectRef.current.selectedOptions[0];
    const newEditor = {
      type: selectedOption.getAttribute("data-type"),
      load: JSON.parse(selectedOption.getAttribute("data-load")),
      config: { align: "left", bg: "white", width: 480 },
      expanded: true,
      visible: true,
    };

    dispatch({ type: "ADD_EDITOR", payload: newEditor });
  };

  return (
    <div
      className={clsx(
        "bg-neutral-200 fixed left-0 w-0 top-0 h-screen shadow-lg transition-all overflow-y-auto duration-300",
        isSidebarOpen ? "w-84 sm:w-84" : "sm:w-12"
      )}
    >
      <SidebarOpener
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      {isSidebarOpen && (
        <div className="pl-2 pr-8">
          <p className="text-center block py-2 text-lg">Blog Editor</p>
          <TitleInput title={title} setTitle={setTitle} />
          <HeaderImageEditor
            setHeaderPicture={setHeaderPicture}
            headerPicture={headerPicture}
          />
          <MemberSelector setSelectedMember={setSelectedMember} />
          <hr className="mb-2 mt-4" />
          <p className="text-center block py-2 text-lg">Add Blog Elements</p>
          <main className="space-y-4 mb-4">
            {editors.map((editor, index) => (
              <EditorForm
                key={index}
                index={index}
                type={editor.type}
                load={editor.load}
                dispatch={dispatch}
                config={editor.config}
                expanded={editor.expanded}
                visible={editor.visible}
              />
            ))}
          </main>
          <div className="flex space-x-2 text-sm mt-4">
            <select ref={selectRef} className="bg-white border p-2 text-black">
              <option value={"placeholder"}>--select a component--</option>
              {options.map((opt) => (
                <option
                  key={opt.type}
                  data-type={opt.type}
                  data-load={JSON.stringify(opt.load)}
                  value={opt.type}
                >
                  {opt.label}
                </option>
              ))}
            </select>
            <button
              onClick={handleAddEditor}
              className="border px-2 cursor-pointer hover:bg-green-200 transition-all text-black"
            >
              Add Element
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Sidebar;

function SidebarOpener({ isSidebarOpen, setIsSidebarOpen }) {
  return (
    <button
      className="cursor-pointer w-full text-white text-2xl bg-gray-700 p-2 text-center font-bold"
      onClick={() => setIsSidebarOpen((prev) => !prev)}
    >
      {isSidebarOpen ? "<<" : ">>"}
    </button>
  );
}
