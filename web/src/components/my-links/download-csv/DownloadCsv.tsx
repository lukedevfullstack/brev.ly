import { TextButton } from "@/components/ui/buttons/text-button/TextButton";
import { Dialog } from "@/components/ui/dialog/Dialog";
import { useRequest } from "@/hooks/use-request";
import { useToggle } from "@/hooks/use-toggle";
import { Icons } from "@/icons/Icons";
import { getFilenameFromUrl } from "@/utils/get-filename-from-url";
import { triggerDownloadFromBlob } from "@/utils/trigger-download-from-blob";

interface DownloadCSV {
  isDisabled?: boolean;
}

export const DownloadCSV = ({ isDisabled }: DownloadCSV) => {
  const [isErrorDialogToggled, onErrorDialogToggle] = useToggle();
  const getReportUrl = useRequest<{ reportUrl: string }, string>();
  const downloadCSV = useRequest();

  const isLoading = getReportUrl.loading || downloadCSV.loading;

  return (
    <>
      <TextButton
        variant="secondary"
        size="small"
        active={isLoading}
        disabled={isLoading || isDisabled}
        onClick={() =>
          getReportUrl.sendRequest("urls/exports", {
            method: "POST",
            body: {},
            onSuccess: ({ reportUrl }) => {
              if (!reportUrl) return;
              downloadCSV.sendRequest(reportUrl, {
                method: "GET",
                mode: "cors",
                onSuccess: async (_, response: Response) => {
                  try {
                    const blob = await response.blob();
                    const filename = getFilenameFromUrl(reportUrl);
                    triggerDownloadFromBlob(blob, filename);
                  } catch (err) {
                    onErrorDialogToggle();
                    console.error("Failed to download CSV:", err);
                  }
                },
              });
            },
          })
        }
      >
        {isLoading ? (
          <Icons.Loading className="animate-fast-spin size-4" />
        ) : (
          <Icons.DownloadSimple className="size-4" />
        )}
        <span>Baixar CSV</span>
      </TextButton>
      <Dialog
        isOpen={isErrorDialogToggled}
        onClose={onErrorDialogToggle}
        variant="error"
        title="Erro"
        description="Erro ao baixar CSV. Tente novamente mais tarde."
        className="divide-red-200 bg-red-50 text-red-600"
        selfClosesAfter={5000}
      />
    </>
  );
};
