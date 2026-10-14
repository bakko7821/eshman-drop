export default function HomePage() {
  return (
    <section>
      <h1 className="text-3xl font-bold">Главная страница</h1>
      <p className="mt-3 text-zinc-400">
        Здесь находится контент главной страницы.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {["Карточка 1", "Карточка 2", "Карточка 3"].map((title) => (
          <div
            key={title}
            className="rounded-xl border border-white/10 bg-zinc-800 p-6"
          >
            <h2 className="font-semibold">{title}</h2>
            <p className="mt-2 text-sm text-zinc-400">
              Пример содержимого карточки.
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
