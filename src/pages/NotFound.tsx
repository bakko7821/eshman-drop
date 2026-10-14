import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <section>
      <h1 className="text-3xl font-bold">404</h1>
      <p className="mt-3 text-zinc-400">Страница не найдена.</p>

      <Link
        to="/"
        className="mt-5 inline-block text-blue-400 hover:text-blue-300"
      >
        Вернуться на главную
      </Link>
    </section>
  );
}
