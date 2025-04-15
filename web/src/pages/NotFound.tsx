import { Icons } from "@/icons/Icons";

export const NotFound = () => {
  return (
    <main className="page items-center justify-center">
      <div className="flex w-[22.875rem] flex-col items-center justify-center gap-6 rounded-lg bg-[var(--gray-100)] px-[0.625rem] py-12 duration-150 md:w-[36.25rem] md:px-12 md:py-16">
        <Icons.NotFound className="text-[var(--blue-base)]" />
        <h1 className="text-xl">Link nao encontrado</h1>
        <span className="flex flex-col gap-1 text-center">
          <p className="text-md text-[var(--gray-500)]">
            O link que você está tentando acessar não existe, foi removido ou é
            uma URL inválida.
          </p>
          <p className="text-md text-[var(--gray-500)]">
            Saiba mais em{" "}
            <a
              className="text-md font-normal text-[var(--blue-base)] underline"
              href="/"
            >
              brev.ly
            </a>
          </p>
        </span>
      </div>
    </main>
  );
};
