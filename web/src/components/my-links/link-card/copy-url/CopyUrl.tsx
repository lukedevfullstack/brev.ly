import { IconButton } from "@/components/ui/buttons/icon-button/IconButton";
import { useToast } from "@/components/ui/toast/toast-context/ToastContext";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { Icons } from "@/icons/Icons";
import { useTranslation } from "react-i18next";

interface CopyUrl {
  shortUrl: string;
}

const baseUrl = new URL(window.location.href).origin;
export const CopyUrl = ({ shortUrl }: CopyUrl) => {
  const { t: ts } = useTranslation("translation", {
    keyPrefix: "pages.home.my_links.link_card.copy_url.toast.success",
  });
  const { t: te } = useTranslation("translation", {
    keyPrefix: "pages.home.my_links.link_card.copy_url.toast.error",
  });
  const copyData = useCopyToClipboard();
  const { pushToast } = useToast();

  return (
    <>
      <IconButton
        Icon={<Icons.Copy className="size-3 text-[var(--gray-600)]" />}
        size="medium"
        variant="secondary"
        onClick={() =>
          copyData({
            data: baseUrl + "/" + shortUrl,
            onSuccess: () =>
              pushToast({
                variant: "success",
                title: ts("title"),
                description: ts("description", { shortUrl }),
                className: "text-[var(--blue-base)]",
              }),
            onError: (err) => {
              console.warn(err);
              pushToast({
                variant: "error",
                title: te("title"),
                description: te("description"),
                className: "text-red-600",
              });
            },
          })
        }
      />
    </>
  );
};
