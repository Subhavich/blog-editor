// Updated Result component to use editors state instead of mockBlog
import renderEle from "./blocks/Outlet";

function Result({ editors }) {
  return (
    <div className="p-4 mt-8">
      <h2 className="text-xl font-bold mb-4">Preview:</h2>
      {editors.length > 0 ? (
        editors.map((ele, index) => (
          <div className="overflow-clip" key={index}>
            {renderEle(ele.type, ele.load, ele.config)}
          </div>
        ))
      ) : (
        <p className="text-gray-500">No elements added yet.</p>
      )}
    </div>
  );
}

export default Result;
