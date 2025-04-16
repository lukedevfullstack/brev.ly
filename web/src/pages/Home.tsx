import { MyLinks } from "@/components/my-links/MyLinks";
import { NewLink } from "@/components/new-link/NewLink";
import { useOnMount } from "@/hooks/use-on-mount";
import { useRequest } from "@/hooks/use-request";
import { Link } from "@/types/link";
import { useState } from "react";

export const Home = () => {
  const [links, setLinks] = useState<Link[]>([]);
  const { loading, sendRequest } = useRequest<{ urls: Link[] }, string>();

  useOnMount(() => {
    sendRequest("/api/urls", {
      method: "GET",
      onSuccess: (res) => setLinks(res.urls),
    });
  });

  return (
    <main className="page 3xl:justify-center items-center">
      <div className="3xl:grid 3xl:grid-cols-10 3xl:gap-[1.25rem] 3xl:w-full 3xl:px-[15%] 3xl:pt-0 relative flex flex-col gap-3 pt-20">
        <NewLink />
        <MyLinks links={links} loading={loading} />
      </div>
    </main>
  );
};
