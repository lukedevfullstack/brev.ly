import { IconButton } from "@/components/ui/buttons/icon-button/IconButton";
import { Icons } from "@/icons/Icons";

interface LinkCard {
  id?: string;
  originalUrl: string;
  shortUrl: string;
  visitCount: number;
}
export const LinkCard = ({ originalUrl, shortUrl, visitCount }: LinkCard) => {
  return (
    <div className="3xl:h-[4.625rem] 3xl:py-4 flex h-[4.125rem] w-full snap-start snap-always items-center justify-between gap-[1.25rem] py-3 text-nowrap duration-150">
      <span className="flex h-full flex-col items-start justify-center gap-1 overflow-hidden">
        <h3 className="text-md text-[var(--blue-base)]">brev.ly/{shortUrl}</h3>
        <p className="w-full truncate text-sm text-[var(--gray-500)]">
          {originalUrl}
        </p>
      </span>
      <div className="flex h-full items-center justify-end gap-[1.25rem] pl-[1.25rem]">
        <p className="text-sm text-[var(--gray-500)]">{visitCount} acessos</p>
        <div className="flex items-center justify-end gap-1">
          <IconButton
            Icon={<Icons.Copy className="size-3 text-[var(--gray-600)]" />}
            size="medium"
            variant="secondary"
          />
          <IconButton
            Icon={<Icons.Trash className="size-3 text-[var(--gray-600)]" />}
            size="medium"
            variant="secondary"
          />
        </div>
      </div>
    </div>
  );
};
