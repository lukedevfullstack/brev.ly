import { useTranslation } from "react-i18next";
import { twMerge } from "tailwind-merge";
import { CopyUrl } from "./copy-url/CopyUrl";
import { DeleteUrl } from "./delete-url/DeleteUrl";

interface LinkCard {
  id?: string;
  originalUrl: string;
  shortUrl: string;
  visitCount: number;
  isUpdating?: boolean;
  isDeleting?: boolean;
  onLinkClick: () => void;
  onLinkDelete: () => void;
}

const baseUrl = new URL(window.location.href).origin;

enum Clicks {
  LEFT_CLICK = 0,
  MIDDLE_CLICK = 1,
}

export const LinkCard = ({
  originalUrl,
  shortUrl,
  visitCount,
  isUpdating,
  isDeleting,
  onLinkClick,
  onLinkDelete,
}: LinkCard) => {
  const { t } = useTranslation("translation", {
    keyPrefix: "pages.home.my_links.link_card",
  });
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const isLeftClick = e.button === Clicks.LEFT_CLICK;
    const isMiddleClick = e.button === Clicks.MIDDLE_CLICK;

    if (isLeftClick || isMiddleClick) {
      onLinkClick();
    }
  };

  return (
    <div
      className={twMerge(
        "3xl:h-[4.625rem] 3xl:py-4 flex h-[4.125rem] w-full snap-start snap-always items-center justify-between gap-[1.25rem] py-3 text-nowrap duration-150",
        (isUpdating || isDeleting) && "border-active opacity-75",
      )}
    >
      <a
        href={`${baseUrl}/${shortUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-full flex-col items-start justify-center gap-1 overflow-hidden"
        onClick={handleClick}
        onAuxClick={handleClick}
        onContextMenu={(e) => {
          e.preventDefault();
          onLinkClick();
        }}
      >
        <h3 className="text-md text-[var(--blue-base)]">brev.ly/{shortUrl}</h3>
        <p className="w-full truncate text-sm text-[var(--gray-500)]">
          {originalUrl}
        </p>
      </a>
      <div className="flex h-full items-center justify-end gap-[1.25rem] pl-[1.25rem]">
        <p className="text-sm text-[var(--gray-500)]">
          {t("visit", { count: visitCount })}
        </p>
        <div className="flex items-center justify-end gap-1">
          <CopyUrl shortUrl={shortUrl} />
          <DeleteUrl shortUrl={shortUrl} onLinkDelete={onLinkDelete} />
        </div>
      </div>
    </div>
  );
};
