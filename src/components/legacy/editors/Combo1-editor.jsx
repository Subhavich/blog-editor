import { useState, useRef, useEffect } from "react";
const Combo1Editor = () => {
  const [heroImage, setHeroImage] = useState(null);
  const [paragraph, setParagraph] = useState("");
  const [header, setHeader] = useState("");

  const pickerRef = useRef();

  useEffect(() => {
    return () => {
      if (heroImage) URL.revokeObjectURL(heroImage);
    };
  }, [heroImage]);

  const pickedHandler = (e) => {
    if (e.target.files && e.target.files.length !== 0) {
      const objectUrl = URL.createObjectURL(e.target.files[0]);
      setHeroImage(objectUrl);
    }
  };
  return (
    <main className="max-w-screen-sm mx-auto  flex flex-col gap-y-4 mb-4 ">
      <p className="text-4xl">Editor</p>

      <label className="text-xl">Header Image</label>
      <input
        ref={pickerRef}
        onChange={pickedHandler}
        type="file"
        className="border-zinc-400 border w-fit hidden"
      />
      {heroImage ? (
        <>
          <div
            className=" relative size-24 overflow-hidden bg-cover bg-center rounded-lg"
            style={{ backgroundImage: `url(${heroImage})` }}
          >
            <div className=" size-24 backdrop-brightness-50 z-10 inset absolute"></div>
            <p
              onClick={() => pickerRef.current.click()}
              className="cursor-pointer hover:scale-125 transition-all size-24 z-24 flex items-center justify-center text-white absolute text-4xl"
            >
              +
            </p>
          </div>
        </>
      ) : (
        <div
          onClick={() => pickerRef.current.click()}
          className=" cursor-pointer border-3 rounded-lg transition-all size-24 z-24 flex items-center justify-center text-4xl"
        >
          +
        </div>
      )}
      <label htmlFor="header" className="text-xl">
        Section Header
      </label>
      <input
        value={header}
        name="header"
        id="header"
        className="border border-zinc-400 rounded"
        onChange={(e) => setHeader(e.target.value)}
      />
      <label htmlFor="paragraph" className="text-xl">
        Section text
      </label>
      <textarea
        value={paragraph}
        rows="4"
        name="paragraph"
        id="paragraph"
        className="border border-zinc-400 rounded"
        onChange={(e) => setParagraph(e.target.value)}
      />
    </main>
  );
};

export default Combo1Editor;
