import { Icons } from "@/icons/Icons";

export const Home = () => {
  return (
    <main className="page items-center justify-center">
      <div className="flex w-fit flex-col items-start gap-8">
        <Icons.Logo className="text-[var(--blue-dark)]" />
        <div className="flex items-start justify-center gap-[1.25rem]"></div>
      </div>
    </main>
  );
};
