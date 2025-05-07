import { ComponentSizes } from "@/types/components-sizes";
import { twMerge } from "tailwind-merge";

const sizeStyle: Record<ComponentSizes, string> = {
  small: "h-8 w-40 gap-2 px-4 py-[0.375rem] text-xs",
  medium: "h-10 w-[12.5rem] gap-2 px-4 py-2 text-sm",
  large: "h-12 w-60 gap-2 px-4 py-3 text-base",
};

interface MenuItemProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: React.ReactNode;
  onClick: (e: React.MouseEvent) => void;
  isSelected?: boolean;
  isDisabled?: boolean;
  size?: ComponentSizes;
}

export const MenuItem = ({
  className,
  children,
  onClick,
  size = "medium",
  isDisabled = false,
  isSelected = false,
  ...props
}: MenuItemProps) => {
  const isString = typeof children === "string";

  return (
    <div
      className={twMerge(
        "box-border flex cursor-pointer items-center justify-center bg-[var(--gray-100)] bg-none text-nowrap hover:bg-[var(--gray-300)] disabled:cursor-default",
        isSelected ? "bg-[var(--gray-300)]" : "",
        sizeStyle[size],
        className,
      )}
      onClick={(e) => (isDisabled ? {} : onClick(e))}
      role="menuitem"
      tabIndex={0}
      {...props}
    >
      {isString ? (
        <p className="overflow-hidden text-ellipsis">{children}</p>
      ) : (
        <>{children}</>
      )}
    </div>
  );
};
