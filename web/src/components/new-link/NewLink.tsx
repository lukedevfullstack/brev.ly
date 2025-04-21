import { useForm } from "@/hooks/use-form";
import { Icons } from "@/icons/Icons";
import { validateLongUrl } from "@/utils/validate-long-url";
import { validateShortUrl } from "@/utils/validate-short-url";
import { Button } from "../ui/buttons/button/Button";
import { TextInput } from "../ui/inputs/text-input/TextInput";
import { Label } from "../ui/label/Label";

interface NewLink {
  onLinkCreate: (params: { originalUrl: string; shortUrl: string }) => void;
}

const formFields = [
  {
    key: "originalUrl",
    label: "link original",
    placeholder: "www.exemplo.com.br",
    prefix: "",
  },
  {
    key: "shortUrl",
    label: "link encurtado",
    placeholder: "",
    prefix: "Brev.ly/",
  },
] as const;

export const NewLink = ({ onLinkCreate }: NewLink) => {
  const { values, errors, submitting, handleChange, handleSubmit } = useForm({
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
    <div className="3xl:col-span-4 3xl:w-auto 3xl:flex-1 3xl:max-w-[23.75rem] 3xl:min-h-[21.25rem] 3xl:p-8 relative flex h-fit min-h-[19.75rem] w-[22.875rem] flex-1 flex-col items-start gap-6 self-stretch rounded-lg bg-[var(--gray-100)] p-6">
      <Icons.Logo className="max-3xl:right-0 max-3xl:w-full 3xl:-top-[3.5rem] absolute -top-[3rem] left-0 text-[var(--blue-dark)] duration-150" />
      <h2 className="text-lg">Novo link</h2>

      <div className="flex w-full flex-col gap-4">
        {formFields.map(({ key, label, placeholder, prefix }) => (
          <div key={key} className="relative w-full">
            <Label label={label} error={errors[key]}>
              <TextInput
                id={key}
                placeholder={placeholder}
                className={prefix ? "pl-[3.625rem]" : ""}
                value={values[key]}
                hasError={!!errors[key]}
                onChange={(e) => handleChange(key, e.target.value)}
              />
            </Label>

            {prefix && (
              <span className="absolute top-10 left-[1.025rem] text-sm font-normal text-[var(--gray-400)] lowercase">
                {prefix}
              </span>
            )}
          </div>
        ))}
      </div>

      <Button onClick={handleSubmit} disabled={submitting}>
        {submitting ? "Salvando..." : "Salvar link"}
      </Button>
    </div>
  );
};
