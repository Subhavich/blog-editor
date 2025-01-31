import { useState, useEffect, useRef } from "react";

const mockBlog = [
  { type: "header", load: { text: "Damon" } },
  { type: "combo", load: { text: "Stauskas", head: "Nick" } },
  { type: "header", load: { text: "Damon" } },
];

function App() {
  const [editors, setEditors] = useState([]);
  const selectRef = useRef();
  const handleAddEditor = (e) => {
    const selectedOption = selectRef.current.selectedOptions[0];
    const selectedValue = {
      type: selectedOption.getAttribute("data-type"),
      load: JSON.parse(selectedOption.getAttribute("data-load")),
    };

    setEditors((pvEditors) => [...pvEditors, selectedValue]);
  };

  useEffect(() => {
    console.log(editors);
  }, [editors]);

  return (
    <>
      <p className="text-center block py-12">EDITORs</p>
      <main className="mx-auto max-w-screen-sm mb-4">
        <div className="flex space-x-2">
          {editors.map((editor) => getEdit(editor.type))}
        </div>
        <div className="flex space-x-2">
          <select ref={selectRef} className="border p-2">
            <option
              data-type="combo"
              data-load='{"text":"","head":""}'
              value="combo"
            >
              combo
            </option>
            <option data-load='{"text":""}' data-type="header" value="header">
              header
            </option>
          </select>
          <button
            onClick={handleAddEditor}
            className="border px-2 hover:bg-green-200 transition-all"
          >
            Add Element
          </button>
        </div>
      </main>
      <Result />
    </>
  );
}

export default App;

function Header({ load }) {
  const { text } = load;
  return (
    <p className="text-white text-2xl font-bold bg-neutral-950 p-4">{text}</p>
  );
}

function Combo({ load }) {
  const { head, text } = load;
  return (
    <>
      <div className="p-4 bg-yellow-400/50">
        <p className="text-2xl">{head}</p>
        <p>{text}</p>
      </div>
    </>
  );
}

function ComboEditor({}) {
  return <p>Nile</p>;
}

function HeaderEditor({}) {
  return (
    <>
      <p>Fun</p>
    </>
  );
}

function getEle(type, load) {
  switch (type) {
    case "header":
      return <Header load={load} />;
    case "combo":
      return <Combo load={load} />;
    default:
      return null;
  }
}
function getEdit(type, load) {
  switch (type) {
    case "header":
      return <HeaderEditor />;
    case "combo":
      return <ComboEditor />;
    default:
      return null;
  }
}

function Result() {
  return <>{mockBlog.map((ele) => getEle(ele.type, ele.load))}</>;
}
