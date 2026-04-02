import MovieCard from "./MovieCard";

export default function Section({ title, items, onOpenDetail }) {
  return (
    <section className="px-6 md:px-12 py-8">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-white text-xl font-black">{title}</h2>
        <a
          href="#"
          className="text-indigo-400 hover:text-indigo-300 text-sm transition-colors"
        >
          See All →
        </a>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-3">
        {items.map((m) => (
          <MovieCard key={m.id} movie={m} onOpenDetail={onOpenDetail} />
        ))}
      </div>
    </section>
  );
}