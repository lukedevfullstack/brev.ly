import { TextButton } from "@/components/ui/buttons/text-button/TextButton";
import { useToast } from "@/components/ui/toast/toast-context/ToastContext";
import { useRequest } from "@/hooks/use-request";
import { Icons } from "@/icons/Icons";
import { getFilenameFromUrl } from "@/utils/get-filename-from-url";
import { triggerDownloadFromBlob } from "@/utils/trigger-download-from-blob";
import { useTranslation } from "react-i18next";

interface DownloadCSV {
  isDisabled?: boolean;
}

export const DownloadCSV = ({ isDisabled }: DownloadCSV) => {
  const { t } = useTranslation("translation", {
    keyPrefix: "pages.home.my_links.download_csv",
  });
  const { t: ts } = useTranslation("translation", {
    keyPrefix: "pages.home.my_links.download_csv.toast.success",
  });
  const { t: te } = useTranslation("translation", {
    keyPrefix: "pages.home.my_links.download_csv.toast.error",
  });
  const getReportUrl = useRequest<{ reportUrl: string }, string>();
  const downloadCSV = useRequest();
  const { pushToast } = useToast();

  const isLoading = getReportUrl.loading || downloadCSV.loading;

  return (
    <>
      <TextButton
        variant="secondary"
        size="small"
        className="min-w-fit"
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
                    pushToast({
                      variant: "success",
                      title: ts("title"),
                      description: ts("description"),
                      className: "text-[var(--blue-base)]",
                    });
                  } catch (err) {
                    console.error("Failed to download CSV:", err);
                    pushToast({
                      variant: "error",
                      title: te("title"),
                      description: te("description"),
                      className: "text-red-600",
                    });
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
        <span>{t("action")}</span>
      </TextButton>
    </>
  );
};
