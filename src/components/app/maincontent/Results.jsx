// Updated Result component to use editors state instead of mockBlog
import renderEle from "../../blocks/Outlet";

function Result({ editors, screenWidth }) {
  return (
    <div className="p-4 mt-8">
      <h2 className="text-xl font-bold  mb-4">Preview Screen</h2>
      <div
        id="me"
        className={`border-neutral-700  ${screenWidth}  rounded-lg border-8 `}
      >
        {editors.length > 0 ? (
          editors.map((ele, index) => (
            <div className="overflow-clip" key={index}>
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
