interface SectionTitleProps {
  title: string;
}

export function SectionTitle({ title }: SectionTitleProps) {
  return (
    <div className="px-7 py-6 w-fit lg:px-32">
      <h3 className="text-light-300 font-medium text-xl">{title}</h3>
    </div>
  );
}
