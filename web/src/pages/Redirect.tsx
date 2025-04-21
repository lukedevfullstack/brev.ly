import { Icons } from "@/icons/Icons";
import { useEffect } from "react";
import { useLoaderData } from "react-router";

type VisitResponse = { originalUrl: string };

export const Redirect = () => {
  const { originalUrl } = useLoaderData() as VisitResponse;

  useEffect(() => {
    if (originalUrl) {
      window.location.href = originalUrl;
    }
  }, [originalUrl]);

  return (
    <main className="page items-center justify-center">
      <div className="flex w-[22.875rem] flex-col items-center justify-center gap-6 rounded-lg bg-[var(--gray-100)] px-[0.625rem] py-12 duration-150 md:w-[36.25rem] md:px-12 md:py-16">
        <Icons.Logomark className="text-[var(--blue-dark)]" />
        <h1 className="text-xl">Redirecionando...</h1>
        <span className="flex flex-col gap-1 text-center">
          <p className="text-md text-[var(--gray-500)]">
            O link será aberto automaticamente em alguns instantes.
          </p>
          <p className="text-md text-[var(--gray-500)]">
            Não foi redirecionado?{" "}
            <a
              className="text-md font-normal text-[var(--blue-base)] underline"
              href="/"
            >
              Acesse aqui
            </a>
          </p>
        </span>
      </div>
    </main>
  );
};
