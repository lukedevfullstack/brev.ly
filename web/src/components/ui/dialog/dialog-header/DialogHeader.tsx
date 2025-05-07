interface DialogHeader {
  title: string;
  Icon: React.ReactNode;
}

export const DialogHeader = ({ title, Icon }: DialogHeader) => {
  return (
    <span className="3xl:px-4 3xl:py-3 flex min-h-14 items-center justify-start gap-2 px-2 py-1 font-bold">
      {Icon}
      <p>{title}</p>
    </span>
  );
};
