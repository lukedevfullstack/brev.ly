import { useTimeout } from "@/hooks/use-timeout";
import { Icons } from "@/icons/Icons";
import { useTranslation } from "react-i18next";
import { useLoaderData } from "react-router";

type VisitResponse = { originalUrl: string };
const redirectTimeout = 500;

export const Redirect = () => {
  const { t } = useTranslation("translation", {
    keyPrefix: "pages.redirect",
  });
  const { originalUrl } = useLoaderData() as VisitResponse;

  useTimeout(
    () => {
      if (originalUrl) {
        window.location.href = originalUrl;
      }
    },
    originalUrl ? redirectTimeout : null,
  );

  return (
    <main className="page items-center justify-center">
      <div className="flex w-[22.875rem] flex-col items-center justify-center gap-6 rounded-lg bg-[var(--gray-100)] px-[0.625rem] py-12 duration-150 md:w-[36.25rem] md:px-12 md:py-16">
        <Icons.Logomark className="text-[var(--blue-dark)]" />
        <h1 className="text-xl">{t('title')}</h1>
        <span className="flex flex-col gap-1 text-center">
          <p className="text-md text-[var(--gray-500)]">
            {t('description')}
          </p>
          <p className="text-md text-[var(--gray-500)]">
            {t('subdescription')}{' '}
            <a
              className="text-md font-normal text-[var(--blue-base)] underline"
              href={originalUrl}
            >
              {t('direction')}
            </a>
          </p>
        </span>
      </div>
    </main>
  );
};
