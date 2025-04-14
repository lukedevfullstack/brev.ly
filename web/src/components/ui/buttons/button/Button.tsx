import { ComponentSizes } from "@/types/components-sizes";
import { ComponentVariants } from "@/types/components-variants";
import { twMerge } from "tailwind-merge";

interface Button extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: React.ReactNode;
  variant?: ComponentVariants;
  size?: ComponentSizes;
}

const variantStyle: Record<ComponentVariants, string> = {
  primary:
    "bg-[var(--blue-base)] text-white enabled:hover:bg-[var(--blue-dark)]",
  secondary:
    "bg-[var(--gray-200)] text-gray-500 enabled:hover:bg-[var(--gray-300)]",
};

const sizeStyle: Record<ComponentSizes, string> = {
  small: "text-sm",
  medium: "text-md",
  large: "text-lg",
};

export const Button = ({
  className,
  variant = "primary",
  size = "medium",
  children,
  ...props
}: Button) => {
  return (
    <button
      className={twMerge(
        "rounded-base flex h-12 w-[19.75rem] items-center justify-center gap-[0.375rem] transition-all duration-150 enabled:cursor-pointer disabled:opacity-50",
        variantStyle[variant],
        sizeStyle[size],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};
