import { IconButton } from "@/components/ui/buttons/icon-button/IconButton";
import { useToast } from "@/components/ui/toast/toast-context/ToastContext";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { Icons } from "@/icons/Icons";

interface CopyUrl {
  shortUrl: string;
}

const baseUrl = new URL(window.location.href).origin;
export const CopyUrl = ({ shortUrl }: CopyUrl) => {
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
                title: "Sucesso!",
                description: `O link "${shortUrl}" foi copiado para a área de transferência.`,
                className: "text-[var(--blue-base)]",
              }),
            onError: (err) => {
              console.warn(err);
              pushToast({
                variant: "error",
                title: "Erro",
                description: `Erro ao copiar o link. Tente novamente mais tarde.`,
                className: "text-red-600",
              });
            },
          })
        }
      />
    </>
  );
};
