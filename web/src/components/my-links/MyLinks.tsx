import { Icons } from "@/icons/Icons";
import { TextButton } from "../ui/buttons/text-button/TextButton";
import { Divider } from "../ui/divider/Divider";

export const MyLinks = () => {
  return (
    <div className="relative flex h-auto w-[22.875rem] flex-col items-start gap-[1.25rem] rounded-lg bg-[var(--gray-100)] p-8 3xl:col-span-6 3xl:w-auto 3xl:flex-1 3xl:min-w-[36.25rem] 3xl:gap-6">
      <span className="flex w-auto flex-1 items-center justify-between self-stretch">
        <h2 className="text-lg">Meus links</h2>
        <TextButton
          variant="secondary"
          size="small"
          className="bg-[var(--gray-100)] 3xl:bg-[var(--gray-200)]"
        >
          <Icons.DownloadSimple className="size-4" />
          <span>Baixar CSV</span>
        </TextButton>
      </span>
      <div className="flex flex-1 flex-grow-0 flex-col gap-4 self-stretch">
        <Divider />
        <span className="flex h-auto w-auto flex-1 flex-grow-0 flex-col items-center justify-center gap-4 self-stretch px-4 py-6">
          <Icons.Link className="text-[var(--gray-400)]" />
          <p className="text-xs text-[var(--gray-500)] uppercase">
            Ainda não existem links cadastrados
          </p>
        </span>
      </div>
    </div>
  );
};
