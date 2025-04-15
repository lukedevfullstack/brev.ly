import { twMerge } from "tailwind-merge";

interface Divider extends React.HTMLAttributes<HTMLSpanElement> {
  className?: string;
}

export const Divider = ({ className, ...props }: Divider) => {
  return (
    <span
      className={twMerge("h-0 w-full ring-1 ring-[var(--gray-200)]", className)}
      {...props}
    />
  );
};
