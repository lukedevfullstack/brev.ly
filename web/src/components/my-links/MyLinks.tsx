import { Icons } from "@/icons/Icons";
import { Link } from "@/types/link";
import { TextButton } from "../ui/buttons/text-button/TextButton";
import { Divider } from "../ui/divider/Divider";
import { ScrollArea } from "../ui/scroll-area/ScrollArea";
import { LinkCard } from "./link-card/LinkCard";

interface MyLinks {
  links: Link[];
  loading: boolean;
}

export const MyLinks = ({ links }: MyLinks) => {
  return (
    <div className="3xl:col-span-6 3xl:w-auto 3xl:flex-1 3xl:min-w-[36.25rem] 3xl:gap-6 3xl:h-auto 3xl:p-8 relative flex h-[21.75rem] w-[22.875rem] flex-col items-start gap-[1.25rem] rounded-lg bg-[var(--gray-100)] p-6">
      <span className="flex w-auto flex-1 items-center justify-between self-stretch">
        <h2 className="text-lg">Meus links</h2>
        <TextButton variant="secondary" size="small">
          <Icons.DownloadSimple className="size-4" />
          <span>Baixar CSV</span>
        </TextButton>
      </span>
      <div className="flex w-full flex-col">
        <Divider />
        {links.length > 0 ? (
          <ScrollArea className="divide-y-[1px] divide-[var(--gray-200)]">
            {links?.length > 0 ? (
              links.map((link) => (
                <li key={link.id}>
                  <LinkCard
                    id={link.id}
                    originalUrl={link.originalUrl}
                    shortUrl={link.shortUrl}
                    visitCount={link.visitCount}
                  />
                </li>
              ))
            ) : (
              <></>
            )}
          </ScrollArea>
        ) : (
          <span className="flex h-auto w-auto flex-1 flex-grow-0 flex-col items-center justify-center gap-4 self-stretch px-4 py-6">
            <Icons.Link className="text-[var(--gray-400)]" />
            <p className="text-xs text-[var(--gray-500)] uppercase">
              Ainda não existem links cadastrados
            </p>
          </span>
        )}
      </div>
    </div>
  );
};
