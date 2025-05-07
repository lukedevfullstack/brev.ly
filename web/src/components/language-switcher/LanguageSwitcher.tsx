import { useTargetRect } from "@/hooks/use-target-rect";
import { Icons } from "@/icons/Icons";
import { availableLanguages, loadLanguage } from "@/libs/i18n";
import { useTranslation } from "react-i18next";
import { twMerge } from "tailwind-merge";
import { IconButton } from "../ui/buttons/icon-button/IconButton";
import { Dropdown } from "../ui/dropdown/Dropdown";
import { MenuItem } from "../ui/menu/menu-item/MenuItem";

export const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation("translation", { keyPrefix: "languages" });
  const { targetRect, getTargetRect, clearTargetRect, componentRef } =
    useTargetRect();

  return (
    <>
      <div
        className="3xl:top-4 absolute top-8 right-8 z-20 flex items-center justify-between gap-1 font-bold text-[var(--gray-400)]"
        ref={componentRef}
      >
        <p className="3xl:flex mr-1 hidden">{t(i18n.language)}</p>
        <Icons.BaselineLanguage />
        <IconButton
          className={twMerge(
            "size-5 rounded-md p-0 transition-all duration-150",
            targetRect !== null ? "rotate-180" : "rotate-0",
          )}
          variant="secondary"
          Icon={<Icons.AngleDown className="size-5" />}
          onClick={() =>
            targetRect !== null ? clearTargetRect() : getTargetRect()
          }
        />
      </div>
      <Dropdown targetRect={targetRect} onClose={clearTargetRect} offsetY={4}>
        {availableLanguages.map((language) => (
          <MenuItem
            onClick={() => {
              loadLanguage(language);
              clearTargetRect();
            }}
            key={language}
            size="small"
            isSelected={i18n.language === language}
          >
            {t(language)}
          </MenuItem>
        ))}
      </Dropdown>
    </>
  );
};
