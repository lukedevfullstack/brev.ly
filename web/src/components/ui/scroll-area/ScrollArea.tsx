import { Children, isValidElement } from "react";
import { twMerge } from "tailwind-merge";

interface ScrollArea {
  className?: string;
  children: React.ReactNode;
}

export const ScrollArea = ({ className, children }: ScrollArea) => {
  const childArray = Children.toArray(children);

  const isListItem = childArray.every(
    (child) =>
      isValidElement(child) &&
      typeof child.type === "string" &&
      child.type.toLowerCase() === "li",
  );

  const Wrapper = isListItem ? "ul" : "div";

  return (
    <Wrapper
      className={twMerge(
        "3xl:h-[28dvh] flex w-full snap-y snap-mandatory flex-col overflow-y-auto",
        className,
      )}
    >
      {children}
    </Wrapper>
  );
};
