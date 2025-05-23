import { Link } from "react-router-dom";

export const ErrorPage = () => {
  return (
    <>
      <main className="flex-grow flex items-center justify-center bg-black text-center p-8">
        <section aria-labelledby="error-title">
          <h1
            id="error-title"
            className="text-5xl font-bold text-gray-800 mb-4"
          >
            404
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Lo sentimos, la página que buscas no existe.
          </p>
          <Link
            to="/"
            className="inline-block px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Ir al inicio
          </Link>
        </section>
      </main>
    </>
  );
};
