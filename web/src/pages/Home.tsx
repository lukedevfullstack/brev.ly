import { MyLinks } from "@/components/my-links/MyLinks";
import { NewLink } from "@/components/new-link/NewLink";
import { useOnMount } from "@/hooks/use-on-mount";
import { useRequest } from "@/hooks/use-request";
import { Link } from "@/types/link";
import { useState } from "react";

export const Home = () => {
  const [links, setLinks] = useState<Link[]>([]);
  const { loading, sendRequest: fetchAllLinks } = useRequest<
    { urls: Link[] },
    string
  >();
  const { sendRequest: fetchSingleLink } = useRequest<Link, string>();
  const { sendRequest: deleteLink } = useRequest<null, string>();

  useOnMount(() => {
    fetchAllLinks("/api/urls", {
      method: "GET",
      onSuccess: (res) => setLinks(res.urls),
    });
  });

  return (
    <main className="page 3xl:justify-center items-center">
      <div className="3xl:grid 3xl:grid-cols-10 3xl:gap-[1.25rem] 3xl:w-full 3xl:px-[15%] 3xl:pt-0 relative flex flex-col gap-3 pt-20">
        <NewLink />
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
                setLinks((prev) =>
                  prev.filter((link) => link.shortUrl !== shortUrl),
                );
              },
            });
          }}
        />
      </div>
    </main>
  );
};
