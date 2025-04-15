import { Icons } from "@/icons/Icons";
import { Button } from "../ui/buttons/button/Button";
import { TextInput } from "../ui/inputs/text-input/TextInput";
import { Label } from "../ui/label/Label";

export const NewLink = () => {
  return (
    <div className="relative flex h-auto w-[22.875rem] flex-1 flex-col items-start gap-6 self-stretch rounded-lg bg-[var(--gray-100)] p-8 3xl:col-span-4 3xl:w-auto 3xl:flex-1 3xl:max-w-[23.75rem]">
      <Icons.Logo className="absolute -top-[3rem] left-0 text-[var(--blue-dark)] duration-150 max-3xl:right-0 max-3xl:w-full 3xl:-top-[3.5rem]" />
      <h2 className="text-lg">Novo link</h2>
      <Label label="link original">
        <TextInput placeholder="www.exemplo.com.br" />
      </Label>
      <Label label="link encurtado">
        <div className="relative">
          <TextInput className="flex justify-start pl-[3.625rem]" />
          <span className="absolute top-4 left-[1.025rem] font-normal text-[var(--gray-400)] lowercase">
            Brev.ly/
          </span>
        </div>
      </Label>
      <Button>Salvar link</Button>
    </div>
  );
};