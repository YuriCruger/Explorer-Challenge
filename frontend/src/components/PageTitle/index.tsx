interface PageTitleProps {
  title: string;
}

export function PageTitle({ title }: PageTitleProps) {
  return <h1 className="text-light-100 text-4xl py-5">{title}</h1>;
}
