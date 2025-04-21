import { MyLinks } from "@/components/my-links/MyLinks";
import { NewLink } from "@/components/new-link/NewLink";
import { useToast } from "@/components/ui/toast/toast-context/ToastContext";
import { useOnMount } from "@/hooks/use-on-mount";
import { useRequest } from "@/hooks/use-request";
import { Link } from "@/types/link";
import { normalizeUrl } from "@/utils/normalize-url";
import { useState } from "react";

export const Home = () => {
  const [links, setLinks] = useState<Link[]>([]);
  const { loading, sendRequest: fetchAllLinks } = useRequest<
    { urls: Link[] },
    string
  >();
  const { sendRequest: createLink } = useRequest<
    Link,
    { originalUrl: string; shortUrl: string }
  >();
  const { sendRequest: fetchSingleLink } = useRequest<Link, string>();
  const { sendRequest: deleteLink } = useRequest<null, string>();
  const { pushToast } = useToast();

  useOnMount(() => {
    fetchAllLinks("/api/urls", {
      method: "GET",
      onSuccess: (res) => setLinks(res.urls),
    });
  });

  return (
    <main className="page 3xl:justify-center items-center">
      <div className="3xl:grid 3xl:grid-cols-10 3xl:gap-[1.25rem] 3xl:w-full 3xl:px-[15%] 3xl:pt-0 relative flex flex-col gap-3 pt-20">
        <NewLink
          onLinkCreate={(data: { originalUrl: string; shortUrl: string }) => {
            const normalizedUrl = normalizeUrl(data.originalUrl);

            createLink("/api/urls", {
              method: "POST",
              body: {
                originalUrl: normalizedUrl,
                shortUrl: data.shortUrl,
              },
              onSuccess: (newLink) => {
                pushToast({
                  variant: "success",
                  title: "Sucesso!",
                  description: `O link "${newLink.shortUrl}" foi criado com sucesso!`,
                  className: "text-[var(--blue-base)]",
                });

                setLinks((prev) => [newLink, ...prev]);
              },
              onError: (err, res) => {
                console.warn(err);
                pushToast({
                  variant: "error",
                  title: "Erro",
                  description:
                    res?.status === 409
                      ? "Link encurtado já existe."
                      : "Erro ao criar o link. Tente novamente mais tarde.",
                  className: "text-red-600",
                });
              },
            });
          }}
        />
        <MyLinks
          links={links}
          loading={loading}
          onLinkClick={async (shortUrl: string) => {
            await new Promise((resolve) => setTimeout(resolve, 1000));

            fetchSingleLink(`/api/urls/${shortUrl}`, {
              method: "GET",
              onSuccess: (updatedLink) => {
                setLinks((prev) =>
                  prev.map((link) =>
                    link.shortUrl === shortUrl ? updatedLink : link,
                  ),
                );
              },
            });
          }}
          onLinkDelete={async (shortUrl: string) => {
            deleteLink(`/api/urls/${shortUrl}`, {
              method: "DELETE",
              body: {},
              onSuccess: () => {
                pushToast({
                  variant: "success",
                  title: "Sucesso!",
                  description: `O link "${shortUrl}" foi deletado com sucesso!.`,
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
                  title: "Erro",
                  description: `Erro ao deletar o link. Tente novamente mais tarde.`,
                  className: "text-red-600",
                });
              },
            });
          }}
        />
      </div>
    </main>
  );
};
