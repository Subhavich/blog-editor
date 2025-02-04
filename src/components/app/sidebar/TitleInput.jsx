function TitleInput({ title, setTitle }) {
  return (
    <input
      className="bg-white border p-2 w-full mb-2 text-xs"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
    />
  );
}
export default TitleInput;
