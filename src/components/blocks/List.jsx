function List({ load, config }) {
  const { align, bg } = config;
  const { head, array } = load;
  return (
    <>
      <div
        className={`p-1 space-y-2 `}
        style={{
          backgroundColor: bg,
          display: "flex",
          flexDirection: "column",

          alignItems:
            align === "center"
              ? "center"
              : align === "left"
              ? "start"
              : "start",
          color: bg === "black" ? "white" : "black",
        }}
      >
        <p className="font-bold text-lg ">{head}</p>
        <ul
          className=" flex flex-col space-y-2 "
          style={{
            textAlign: align === "center" ? "center" : "left",
            color: bg === "black" ? "white" : "black",
          }}
        >
          {array.map((text, ind) => (
            <li className=" text-neutral-500 pl-2 " key={ind}>
              {text}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
export default List;
