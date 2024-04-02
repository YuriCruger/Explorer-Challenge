interface TableCellProps {
  name: string | number;
}

export function TableCell({ name }: TableCellProps) {
  return <td className="p-5">{name}</td>;
}
