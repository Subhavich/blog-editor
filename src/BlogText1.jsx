const Blog = ({ header, paragraph, imageUrl }) => (
  <section className="flex flex-col items-center justify-center gap-12 bg-neutral-950 px-16 py-16 md:flex-row rounded-xl">
    <div className="max-w-lg text-center md:text-start">
      <h2 className="mb-3 text-4xl text-white">{header}</h2>
      <p className="mb-6 text-sm leading-relaxed text-neutral-400">
        {paragraph}
      </p>
      <a
        href="#"
        className="group text-sm uppercase text-indigo-300 transition-colors hover:text-indigo-400"
      >
        See More
      </a>
    </div>
    <div className=" relative z-0 overflow-hidden shrink-0 rounded-xl border border-neutral-700 bg-neutral-800">
      <img src={imageUrl} className=" max-w-96 max-h-52 object-scale-down" />
    </div>
  </section>
);

export default Blog;
