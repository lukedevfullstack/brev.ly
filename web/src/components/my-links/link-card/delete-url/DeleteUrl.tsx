import { IconButton } from "@/components/ui/buttons/icon-button/IconButton";
import { Dialog } from "@/components/ui/dialog/Dialog";
import { useToggle } from "@/hooks/use-toggle";
import { Icons } from "@/icons/Icons";
import { useTranslation } from "react-i18next";

interface DeleteUrl {
  shortUrl: string;
  onLinkDelete: () => void;
}

export const DeleteUrl = ({ shortUrl, onLinkDelete }: DeleteUrl) => {
  const { t } = useTranslation("translation", {
    keyPrefix: "pages.home.my_links.link_card.delete_url.dialog",
  });
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
        title={t("title")}
        description={t("description", { shortUrl })}
        actions={[
          {
            label: t("actions.close"),
            onClick: () => {
              onLinkDelete();
              onWarningDialogToggle();
            },
            variant: "secondary",
            size: "small",
          },
          {
            label: t("actions.delete"),
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
