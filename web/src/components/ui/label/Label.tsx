import { Icons } from "@/icons/Icons";
import { twMerge } from "tailwind-merge";

interface Label extends React.LabelHTMLAttributes<HTMLLabelElement> {
  label?: string;
  className?: string;
  children: React.ReactElement<{ id?: string; hasError?: boolean }>;
  error?: string;
}

export const Label = ({
  label,
  className,
  error = "Error message",
  children,
  ...props
}: Label) => {
  const id = children.props.id;
  const hasError = children.props.hasError;

  return (
    <label
      htmlFor={id}
      className={twMerge(
        "group peer flex flex-col items-start justify-start gap-2 text-sm text-[var(--gray-500)] uppercase transition-all duration-150 focus-within:font-bold focus-within:text-[var(--blue-base)]",
        hasError &&
          "font-bold text-[var(--danger)] focus-within:text-[var(--danger)]",
        className,
      )}
      {...props}
    >
      {label}
      {children}
      {hasError && (
        <span className="flex gap-2 text-sm text-gray-500 normal-case">
          <Icons.Warning className="size-4 text-[var(--danger)]" />
          {error}
        </span>
      )}
    </label>
  );
};
