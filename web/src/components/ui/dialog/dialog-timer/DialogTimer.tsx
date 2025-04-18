import { twMerge } from "tailwind-merge";

interface DialogTimer {
  remaining: number;
  total: number;
  isPaused: boolean;
}

export const DialogTimer = ({ remaining, total, isPaused }: DialogTimer) => {
  const progress = Math.max(0, Math.min(1, remaining / total)) * 100;

  return (
    <div
      className="absolute bottom-0 h-1 w-full rounded-b-md border-none bg-[var(--gray-400)] ring-[0.5px] ring-[var(--gray-500)] ring-inset"
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={progress}
    >
      <div
        className={twMerge(
          "box-border h-full animate-pulse border-r-[1px] border-[var(--blue-base)] bg-[var(--blue-dark)] transition-all duration-100 ease-linear",
          isPaused && "animate-none",
        )}
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};
