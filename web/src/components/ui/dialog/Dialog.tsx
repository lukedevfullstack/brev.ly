import { useTimeout } from "@/hooks/use-timeout";
import { Icons } from "@/icons/Icons";
import { useCallback, useEffect, useRef } from "react";
import { Portal, PortalOptions } from "../portal/Portal";
import { ProgressBar } from "../progress-bar/ProgressBar";
import { Action, DialogActions } from "./dialog-actions/DialogActions";
import { DialogContent } from "./dialog-content/DialogContent";
import { DialogHeader } from "./dialog-header/DialogHeader";
import { DialogRoot } from "./dialog-root/DialogRoot";

type DialogVariant = "success" | "error" | "warning" | "info";

const variantIcon: Record<DialogVariant, React.ReactNode> = {
  success: <Icons.NotificationSuccess />,
  error: <Icons.NotificationError />,
  warning: <Icons.NotificationWarning />,
  info: <Icons.NotificationInfo />,
};

interface Dialog {
  isOpen: boolean;
  onClose: () => void;
  variant?: DialogVariant;
  title?: string;
  description?: string;
  className?: string;
  selfClosesAfter?: number;

  /** Action buttons to render in DialogActions */
  actions?: React.ReactNode | Action[];

  /** Optional override components */
  Header?: React.ReactNode;
  Content?: React.ReactNode;
  Actions?: React.ReactNode;

  portalOptions?: PortalOptions;
}

export const Dialog = ({
  isOpen,
  onClose,
  variant = "warning",
  title = "dialog-title",
  description = "dialog-description",
  className,
  selfClosesAfter,

  Header,
  Content,
  Actions,
  actions,

  portalOptions = {
    positionOnScreen: "center",
    backdrop: true,
  },
}: Dialog) => {
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

  const { pause, resume, remaining, isPaused } = useTimeout(
    () => {
      if (isOpen) onClose();
    },
    isOpen && selfClosesAfter ? selfClosesAfter : null,
  );

  return (
    <Portal isOpen={isOpen} onClose={onClose} {...portalOptions}>
      <DialogRoot
        ref={dialogRef}
        title={title}
        description={description}
        className={className}
        onPointerEnter={() => (selfClosesAfter ? pause() : {})}
        onPointerLeave={() => (selfClosesAfter ? resume() : {})}
      >
        {Header ?? <DialogHeader title={title} Icon={variantIcon[variant]} />}
        {Content ?? <DialogContent description={description} />}
        {selfClosesAfter && (
          <ProgressBar
            remaining={remaining ?? 0}
            total={selfClosesAfter}
            isPaused={isPaused}
            isReverse
          />
        )}
        {Actions ?? <DialogActions Actions={actions} />}
      </DialogRoot>
    </Portal>
  );
};
