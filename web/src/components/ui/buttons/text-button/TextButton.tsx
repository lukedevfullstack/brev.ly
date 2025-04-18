import { ComponentSizes } from "@/types/components-sizes";
import { ComponentVariants } from "@/types/components-variants";
import { twMerge } from "tailwind-merge";

interface TextButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: React.ReactNode;
  variant?: ComponentVariants;
  size?: ComponentSizes;
  active?: boolean;
}

const variantStyle: Record<ComponentVariants, string> = {
  primary:
    "bg-[var(--blue-base)] text-white enabled:hover:bg-[var(--blue-dark)]",
  secondary:
    "bg-[var(--gray-200)] text-[var(--gray-500)] enabled:hover:bg-[var(--gray-300)]",
};

const sizeStyle: Record<ComponentSizes, string> = {
  small: "text-sm",
  medium: "text-md",
  large: "text-lg",
};

const variantActiveStyle: Record<ComponentVariants, string> = {
  primary: "border-active-primary",
  secondary: "border-active-secondary",
};

export const TextButton = ({
  className,
  variant = "primary",
  size = "medium",
  children,
  active = false,
  ...props
}: TextButton) => {
  return (
    <button
      className={twMerge(
        "rounded-base flex h-8 w-[6.25rem] items-center justify-center gap-[0.375rem] border-[2px] border-transparent p-2 text-nowrap transition-all duration-150 enabled:cursor-pointer disabled:opacity-50",
        variantStyle[variant],
        active && variantActiveStyle[variant],
        sizeStyle[size],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};
