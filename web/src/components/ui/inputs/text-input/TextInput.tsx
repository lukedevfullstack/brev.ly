import { twMerge } from "tailwind-merge";

interface TextInput extends React.InputHTMLAttributes<HTMLInputElement> {
  id?: string;
  className?: string;
  hasError?: boolean;
}

export const TextInput = ({ id, className, hasError, ...props }: TextInput) => {
  return (
    <input
      id={id}
      className={twMerge(
        "flex h-12 w-[19.75rem] rounded-lg border-[1px] placeholder-[var(--gray-400)] border-[var(--gray-300)] px-4 font-normal text-[var(--gray-600)] transition-all duration-150",
        "focus:border-[var(--blue-dark)] focus:outline-none active:border-[var(--blue-dark)]",
        hasError &&
          "border-[var(--danger)] focus:border-[var(--danger)] active:border-[var(--danger)]",
        className,
      )}
      {...props}
    />
  );
};
