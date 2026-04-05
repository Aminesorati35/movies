import MovieCard from "./MovieCard";

export default function Section({ title, items, onClickSeeAll }) {
  return (
    <section className="px-6 md:px-12 py-8">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-white text-xl font-bold">{title}</h2>

        <button
          onClick={onClickSeeAll}
          className="text-indigo-400 hover:text-indigo-300 text-sm font-bold transition-colors cursor-pointer"
        >
          See All →
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-3">
        {items.map((m) => (
          <MovieCard key={m.id} movie={m} />
        ))}
      </div>
    </section>
  );
}