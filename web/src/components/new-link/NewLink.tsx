import { useForm } from "@/hooks/use-form";
import { Icons } from "@/icons/Icons";
import { validateLongUrl } from "@/utils/validate-long-url";
import { validateShortUrl } from "@/utils/validate-short-url";
import { useTranslation } from "react-i18next";
import { Button } from "../ui/buttons/button/Button";
import { TextInput } from "../ui/inputs/text-input/TextInput";
import { Label } from "../ui/label/Label";

interface NewLink {
  onLinkCreate: (params: { originalUrl: string; shortUrl: string }) => void;
  isCreatingLink: boolean;
  isLoadingLinks: boolean;
}

export const NewLink = ({
  onLinkCreate,
  isCreatingLink,
  isLoadingLinks,
}: NewLink) => {
  const { t } = useTranslation("translation", {
    keyPrefix: "pages.home.new_link",
  });
  const { t: tc } = useTranslation("translation", {
    keyPrefix: "pages.home.new_link.form",
  });
  const { t: ta } = useTranslation("translation", {
    keyPrefix: "pages.home.new_link.actions",
  });
  const { values, errors, handleChange, handleSubmit } = useForm({
    initialValues: {
      originalUrl: "",
      shortUrl: "",
    },
    validators: {
      originalUrl: validateLongUrl,
      shortUrl: validateShortUrl,
    },
    onSubmit: onLinkCreate,
  });

  return (
    <form
      className="3xl:col-span-4 3xl:w-auto 3xl:flex-1 3xl:max-w-[23.75rem] 3xl:min-h-[21.25rem] 3xl:p-8 relative flex h-fit min-h-[19.75rem] w-[22.875rem] flex-1 flex-col items-start gap-6 self-stretch rounded-lg bg-[var(--gray-100)] p-6"
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <Icons.Logo className="max-3xl:right-0 max-3xl:w-full 3xl:-top-[3.5rem] absolute -top-[3rem] left-0 text-[var(--blue-dark)] duration-150" />
      <h2 className="text-lg">{t("title")}</h2>

      <div className="flex w-full flex-col gap-4">
        {/* Original URL field */}
        <div className="relative w-full">
          <Label
            label={tc("original_url.label")}
            error={tc("original_url.error." + errors.originalUrl)}
          >
            <TextInput
              id="originalUrl"
              placeholder={tc("original_url.placeholder")}
              value={values.originalUrl}
              hasError={!!errors.originalUrl}
              onChange={(e) => handleChange("originalUrl", e.target.value)}
            />
          </Label>
        </div>

        {/* Short URL field */}
        <div className="relative w-full">
          <Label
            label={tc("short_url.label")}
            error={tc("short_url.error." + errors.shortUrl)}
          >
            <TextInput
              id="shortUrl"
              placeholder={tc("short_url.placeholder")}
              className="pl-[3.625rem]"
              value={values.shortUrl}
              hasError={!!errors.shortUrl}
              onChange={(e) => handleChange("shortUrl", e.target.value)}
            />
          </Label>
          <span className="absolute top-10 left-[1.025rem] text-sm font-normal text-[var(--gray-400)] lowercase">
            Brev.ly/
          </span>
        </div>
      </div>

      <Button
        onClick={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        disabled={isCreatingLink || isLoadingLinks}
      >
        {ta(isCreatingLink ? "saving" : "save")}
      </Button>
    </form>
  );
};
