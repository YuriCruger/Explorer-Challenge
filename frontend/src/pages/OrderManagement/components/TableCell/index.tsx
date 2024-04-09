import { HTMLAttributes } from "react";

interface TableCellProps extends HTMLAttributes<HTMLTableDataCellElement> {
  name: string | number;
}

export function TableCell({ name, ...props }: TableCellProps) {
  return <td {...props}>{name}</td>;
}
