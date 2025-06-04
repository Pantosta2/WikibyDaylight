import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const ErrorPage = () => {
  const { t } = useTranslation();

  return (
    <main className="flex-grow flex items-center justify-center bg-black text-center p-8 w-screen h-screen">
      <section aria-labelledby="error-title">
        <h1 id="error-title" className="text-5xl font-bold text-gray-800 mb-4">
          404
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          {t("notFoundPage.message")}
        </p>
        <Link
          to="/"
          className="inline-block px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          {t("notFoundPage.homeButtonText")}
        </Link>
      </section>
    </main>
  );
};
