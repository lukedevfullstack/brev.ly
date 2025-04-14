import { Outlet } from "react-router";

export const RootLayout = () => {
  return (
    <section className="h-dvh w-screen flex-1 flex-col items-start justify-start">
      <Outlet />
    </section>
  );
};
