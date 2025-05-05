import { MyLinks } from "@/components/my-links/MyLinks";
import { NewLink } from "@/components/new-link/NewLink";
import { useToast } from "@/components/ui/toast/toast-context/ToastContext";
import { useOnMount } from "@/hooks/use-on-mount";
import { useRequest } from "@/hooks/use-request";
import { LinkWithStatus } from "@/types/link";
import { normalizeUrl } from "@/utils/normalize-url";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export const Home = () => {
  const { t: ts } = useTranslation("translation", {
    keyPrefix: "pages.home.new_link.toast.success",
  });
  const { t: te } = useTranslation("translation", {
    keyPrefix: "pages.home.new_link.toast.error",
  });
  const { t: tds } = useTranslation("translation", {
    keyPrefix: "pages.home.my_links.link_card.delete_url.toast.success",
  });
  const { t: tde } = useTranslation("translation", {
    keyPrefix: "pages.home.my_links.link_card.delete_url.toast.error",
  });
  const [links, setLinks] = useState<LinkWithStatus[]>([]);
  const { loading: isLoadingLinks, sendRequest: fetchAllLinks } = useRequest<
    { urls: LinkWithStatus[] },
    string
  >();
  const { loading: isCreatingLink, sendRequest: createLink } = useRequest<
    LinkWithStatus,
    { originalUrl: string; shortUrl: string }
  >();
  const { sendRequest: fetchSingleLink } = useRequest<LinkWithStatus, string>();
  const { sendRequest: deleteLink } = useRequest<null, string>();
  const { pushToast } = useToast();

  useOnMount(() => {
    fetchAllLinks("urls", {
      method: "GET",
      onSuccess: (res) => setLinks(res.urls),
    });
  });

  const updateLinkStatus = (
    shortUrl: string,
    updates: Partial<LinkWithStatus>,
  ) => {
    setLinks((prev) =>
      prev.map((link) =>
        link.shortUrl === shortUrl ? { ...link, ...updates } : link,
      ),
    );
  };

  return (
    <main className="page 3xl:justify-center items-center">
      <div className="3xl:grid 3xl:grid-cols-10 3xl:gap-[1.25rem] 3xl:w-full 3xl:px-[15%] 3xl:pt-0 3xl:my-[20dvh] relative flex flex-col gap-3 pt-20">
        <NewLink
          isCreatingLink={isCreatingLink}
          isLoadingLinks={isLoadingLinks}
          onLinkCreate={(data: { originalUrl: string; shortUrl: string }) => {
            const normalizedUrl = normalizeUrl(data.originalUrl);

            createLink("urls", {
              method: "POST",
              body: {
                originalUrl: normalizedUrl,
                shortUrl: data.shortUrl,
              },
              onSuccess: (newLink) => {
                pushToast({
                  variant: "success",
                  title: ts("title"),
                  description: ts("description", {
                    shortUrl: newLink.shortUrl,
                  }),
                  className: "text-[var(--blue-base)]",
                });

                setLinks((prev) => [newLink, ...prev]);
              },
              onError: (err, res) => {
                console.warn(err);
                pushToast({
                  variant: "error",
                  title: te("title"),
                  description: te(
                    res?.status === 409
                      ? "conflict_description"
                      : "description",
                  ),
                  className: "text-red-600",
                });
              },
            });
          }}
        />
        <MyLinks
          links={links}
          isLoadingLinks={isLoadingLinks}
          onLinkClick={async (shortUrl: string) => {
            updateLinkStatus(shortUrl, { isUpdating: true });

            await new Promise((resolve) => setTimeout(resolve, 500));

            fetchSingleLink(`urls/${shortUrl}`, {
              method: "GET",
              abortPrevious: false,
              onSuccess: (updatedLink) => {
                setLinks((prev) =>
                  prev.map((link) =>
                    link.shortUrl === shortUrl ? updatedLink : link,
                  ),
                );
              },
              onError: () => {
                updateLinkStatus(shortUrl, { isUpdating: false });
              },
            });
          }}
          onLinkDelete={async (shortUrl: string) => {
            updateLinkStatus(shortUrl, { isDeleting: true });

            deleteLink(`urls/${shortUrl}`, {
              method: "DELETE",
              body: {},
              abortPrevious: false,
              onSuccess: () => {
                pushToast({
                  variant: "success",
                  title: tds("title"),
                  description: tds("description", { shortUrl }),
                  className: "text-[var(--blue-base)]",
                });
                setLinks((prev) =>
                  prev.filter((link) => link.shortUrl !== shortUrl),
                );
              },
              onError: (err) => {
                console.warn(err);
                pushToast({
                  variant: "error",
                  title: tde("title"),
                  description: tde("description"),
                  className: "text-red-600",
                });
                updateLinkStatus(shortUrl, { isDeleting: false });
              },
            });
          }}
        />
      </div>
    </main>
  );
};
