// Updated Result component to use editors state instead of mockBlog
import renderEle from "./blocks/BlockOutlet";

function Result({ editors }) {
  return (
    <div className="p-4 border-t mt-8">
      <h2 className="text-xl font-bold mb-4">Rendered Elements:</h2>
      {editors.length > 0 ? (
        editors.map((ele, index) => (
          <div key={index}>{renderEle(ele.type, ele.load, ele.config)}</div>
        ))
      ) : (
        <p className="text-gray-500">No elements added yet.</p>
      )}
    </div>
  );
}

export default Result;
