import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

interface DialogRootProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  title: string;
  description: string;
}

export const DialogRoot = forwardRef<HTMLDivElement, DialogRootProps>(
  ({ className, title, description, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title}
        aria-describedby={description}
        className={twMerge(
          "3xl:w-md relative flex w-[22.875rem] flex-col divide-y-[1px] divide-[var(--gray-200)] rounded-sm bg-[var(--gray-100)] text-[var(--gray-500)] shadow-xl",
          className,
        )}
        onClick={(e) => e.stopPropagation()}
        {...props}
      >
        {children}
      </div>
    );
  },
);
