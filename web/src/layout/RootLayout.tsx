import { LanguageSwitcher } from "@/components/language-switcher/LanguageSwitcher";
import { ToastProvider } from "@/components/ui/toast/toast-context/ToastProvider";
import { Outlet } from "react-router";

export const RootLayout = () => {
  return (
    <ToastProvider>
      <section className="relative flex h-dvh w-screen">
        <LanguageSwitcher />
        <Outlet />
      </section>
    </ToastProvider>
  );
};
