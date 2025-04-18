import { Icons } from "@/icons/Icons";
import { useCallback, useEffect, useRef } from "react";
import { Portal } from "../portal/Portal";
import { Action, DialogActions } from "./dialog-actions/DialogActions";
import { DialogContent } from "./dialog-content/DialogContent";
import { DialogHeader } from "./dialog-header/DialogHeader";
import { DialogRoot } from "./dialog-root/DialogRoot";

type DialogVariant = "success" | "error" | "warning" | "info";

const variantIcon: Record<DialogVariant, React.ReactNode> = {
  success: <Icons.DialogSuccess />,
  error: <Icons.DialogError />,
  warning: <Icons.DialogWarning />,
  info: <Icons.DialogInfo />,
};

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  variant?: DialogVariant;
  title?: string;
  description?: string;
  className?: string;

  /** Action buttons to render in DialogActions */
  actions?: React.ReactNode | Action[];

  /** Optional override components */
  Header?: React.ReactNode;
  Content?: React.ReactNode;
  Actions?: React.ReactNode;
}

export const Dialog = ({
  isOpen,
  onClose,
  variant = "warning",
  title = "dialog-title",
  description = "dialog-description",
  className,

  Header,
  Content,
  Actions,
  actions,
}: DialogProps) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const lastFocusedElementRef = useRef<HTMLElement | null>(null);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    },
    [onClose],
  );

  useEffect(() => {
    if (isOpen) {
      lastFocusedElementRef.current = document.activeElement as HTMLElement;
      dialogRef.current?.focus();

      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }

    lastFocusedElementRef.current?.focus();
  }, [isOpen, handleKeyDown]);

  return (
    <Portal
      isOpen={isOpen}
      onClose={onClose}
      positionOnScreen="center"
      backdrop
    >
      <DialogRoot
        ref={dialogRef}
        title={title}
        description={description}
        className={className}
      >
        {Header ?? <DialogHeader title={title} Icon={variantIcon[variant]} />}
        {Content ?? <DialogContent description={description} />}
        {Actions ?? <DialogActions Actions={actions} onClose={onClose} />}
      </DialogRoot>
    </Portal>
  );
};
