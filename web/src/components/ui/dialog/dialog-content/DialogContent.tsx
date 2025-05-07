import { twMerge } from "tailwind-merge";

interface DialogContent {
  description?: string;
  className?: string;
}
export const DialogContent = ({ description, className }: DialogContent) => {
  return (
    <span
      className={twMerge(
        "flex h-fit min-h-16 items-center justify-start gap-2 px-4 py-3 text-sm",
        className,
      )}
    >
      {description}
    </span>
  );
};
