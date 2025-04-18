import { ToastProvider } from "@/components/ui/toast/toast-context/ToastProvider";
import { Outlet } from "react-router";

export const RootLayout = () => {
  return (
    <ToastProvider>
      <section className="flex h-dvh w-screen">
        <Outlet />
      </section>
    </ToastProvider>
  );
};
