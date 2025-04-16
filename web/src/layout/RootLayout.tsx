import { Outlet } from "react-router";

export const RootLayout = () => {
  return (
    <section className="h-dvh w-screen flex">
      <Outlet />
    </section>
  );
};
