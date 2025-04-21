import { IconButton } from "@/components/ui/buttons/icon-button/IconButton";
import { Dialog } from "@/components/ui/dialog/Dialog";
import { useToggle } from "@/hooks/use-toggle";
import { Icons } from "@/icons/Icons";

interface DeleteUrl {
  shortUrl: string;
  onLinkDelete: () => void;
}

export const DeleteUrl = ({ shortUrl, onLinkDelete }: DeleteUrl) => {
  const [isWarningDialogToggled, onWarningDialogToggle] = useToggle();

  return (
    <>
      <IconButton
        Icon={<Icons.Trash className="size-3 text-[var(--gray-600)]" />}
        size="medium"
        variant="secondary"
        onClick={onWarningDialogToggle}
      />
      <Dialog
        isOpen={isWarningDialogToggled}
        onClose={onWarningDialogToggle}
        variant="warning"
        title="Deletar URL?"
        description={`Isso removerá permanentemente o link “brev.ly/${shortUrl}” e seu histórico de acessos. Esta ação não poderá ser desfeita`}
        actions={[
          {
            label: "Deletar URL",
            onClick: () => {
              onLinkDelete();
              onWarningDialogToggle();
            },
            variant: "primary",
            size: "small",
          },
        ]}
      />
    </>
  );
};
