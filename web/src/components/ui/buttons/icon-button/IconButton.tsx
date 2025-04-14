import { ComponentSizes } from "@/types/components-sizes";
import { ComponentVariants } from "@/types/components-variants";
import { twMerge } from "tailwind-merge";

interface IconButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  variant?: ComponentVariants;
  size?: ComponentSizes;
  Icon: React.ReactNode;
}

const variantStyle: Record<ComponentVariants, string> = {
  primary:
    "bg-[var(--blue-base)] text-white enabled:hover:border-[var(--blue-dark)]",
  secondary:
    "bg-[var(--gray-200)] text-gray-500 enabled:hover:border-[var(--blue-base)]",
};

const sizeStyle: Record<ComponentSizes, string> = {
  small: "text-sm size-6",
  medium: "text-md size-8",
  large: "text-lg size-10",
};

export const IconButton = ({
  className,
  variant = "primary",
  size = "medium",
  Icon,
  ...props
}: IconButton) => {
  return (
    <button
      className={twMerge(
        "flex items-center justify-center rounded-sm border-[1px] border-transparent transition-all duration-150 enabled:cursor-pointer disabled:opacity-50",
        variantStyle[variant],
        sizeStyle[size],
        className,
      )}
      {...props}
    >
      {Icon}
    </button>
  );
};
