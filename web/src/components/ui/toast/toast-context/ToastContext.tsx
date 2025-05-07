import { createContext, useContext } from "react";
import { ToastEntry, ToastOptions } from "../toast-types/toast-types";

interface ToastContextValue {
  toasts: ToastEntry[];
  pushToast: (options: ToastOptions) => void;
  onToastClose: (toastId: number) => void;
}

export const ToastContext = createContext<ToastContextValue | undefined>(
  undefined,
);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
