import { ComponentSizes } from "@/types/components-sizes";
import { ComponentVariants } from "@/types/components-variants";
import { isValidElement } from "react";
import { twMerge } from "tailwind-merge";
import { Button } from "../../buttons/button/Button";

export interface Action {
  label: string;
  onClick: () => void;
  variant?: ComponentVariants;
  size?: ComponentSizes;
}

interface DialogActions {
  Actions?: Action[] | React.ReactNode;
  className?: string;
}

export const DialogActions = ({ Actions, className }: DialogActions) => {
  return (
    <span
      className={twMerge(
        "3xl:px-4 3xl:py-3 flex h-fit min-h-14 flex-row items-center justify-end gap-2 px-2 py-1 text-sm",
        className,
      )}
    >
      {isValidElement(Actions)
        ? Actions
        : Array.isArray(Actions) &&
          Actions.map((action, idx) => (
            <Button
              key={idx}
              variant={
                action.variant
                  ? action.variant
                  : idx % 2 === 0
                    ? "primary"
                    : "secondary"
              }
              size={action.size ?? "small"}
              onClick={action.onClick}
            >
              {action.label}
            </Button>
          ))}
    </span>
  );
};
