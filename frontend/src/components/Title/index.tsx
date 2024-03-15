interface TitleProps {
  title: string;
}

export function Title({ title }: TitleProps) {
  return (
    <h2 className="text-light-100 font-medium text-4xl text-center hidden lg:block">
      {title}
    </h2>
  );
}
