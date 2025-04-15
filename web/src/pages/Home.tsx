import { MyLinks } from "@/components/my-links/MyLinks";
import { NewLink } from "@/components/new-link/NewLink";

export const Home = () => {
  return (
    <main className="page items-center justify-center">
      <div className="3xl:grid 3xl:grid-cols-10 3xl:gap-[1.25rem] 3xl:w-full 3xl:px-[15%] relative flex flex-col items-start justify-center gap-3">
        <NewLink />
        <MyLinks />
      </div>
    </main>
  );
};
