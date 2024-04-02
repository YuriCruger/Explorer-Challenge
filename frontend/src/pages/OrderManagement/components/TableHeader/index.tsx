interface TableHeaderProps {
  name: string;
}

export function TableHeader({ name }: TableHeaderProps) {
  return <th className="p-5">{name}</th>;
}
