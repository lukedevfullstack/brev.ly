import { Icons } from "@/icons/Icons";
import { LinkWithStatus } from "@/types/link";
import { Divider } from "../ui/divider/Divider";
import { ScrollArea } from "../ui/scroll-area/ScrollArea";
import { DownloadCSV } from "./download-csv/DownloadCsv";
import { LinkCard } from "./link-card/LinkCard";

interface MyLinks {
  links: LinkWithStatus[];
  isLoadingLinks: boolean;
  onLinkClick: (shortUrl: string) => void;
  onLinkDelete: (shortUrl: string) => void;
}

const NoRegisteredLinks = () => (
  <span className="flex h-auto w-auto flex-1 flex-grow flex-col items-center justify-center gap-4 self-stretch px-4 py-6">
    <Icons.Link className="text-[var(--gray-400)]" />
    <p className="text-xs text-[var(--gray-500)] uppercase">
      Ainda não existem links cadastrados
    </p>
  </span>
);

const LoadingLinks = () => {
  return (
    <span className="border-active flex h-auto w-auto flex-1 flex-grow flex-col items-center justify-center gap-4 self-stretch px-4 py-6">
      <Icons.Loading className="animate-fast-spin text-[var(--gray-400)]" />
      <p className="text-xs text-[var(--gray-500)] uppercase">
        Carregando links...
      </p>
    </span>
  );
};

export const MyLinks = ({
  links,
  isLoadingLinks,
  onLinkClick,
  onLinkDelete,
}: MyLinks) => {
  return (
    <div className="3xl:col-span-6 3xl:w-auto 3xl:flex-1 3xl:min-w-[36.25rem] 3xl:gap-6 3xl:h-auto 3xl:p-8 3xl:max-h-fit relative flex max-h-[21.75rem] w-[22.875rem] flex-col items-start gap-[1.25rem] rounded-lg bg-[var(--gray-100)] p-6">
      <span className="flex h-fit w-full items-center justify-between">
        <h2 className="text-lg">Meus links</h2>
        <DownloadCSV isDisabled={isLoadingLinks || !links?.length} />
      </span>
      <div className="flex w-full flex-1 flex-col self-stretch">
        <Divider />
        {isLoadingLinks ? (
          <LoadingLinks />
        ) : links.length > 0 ? (
          <ScrollArea className="3xl:max-h-[36dvh] 3xl:h-auto max-h-[15.75rem] divide-y-[1px] divide-[var(--gray-200)]">
            {links.map((link) => (
              <li key={link.id}>
                <LinkCard
                  id={link.id}
                  originalUrl={link.originalUrl}
                  shortUrl={link.shortUrl}
                  visitCount={link.visitCount}
                  isUpdating={link.isUpdating}
                  isDeleting={link.isDeleting}
                  onLinkClick={() => onLinkClick(link.shortUrl)}
                  onLinkDelete={() => onLinkDelete(link.shortUrl)}
                />
              </li>
            ))}
          </ScrollArea>
        ) : (
          <NoRegisteredLinks />
        )}
      </div>
    </div>
  );
};
