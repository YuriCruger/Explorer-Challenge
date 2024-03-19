import { cn } from "@/utils/cn";
import { ReactNode } from "react";

interface FormGroupProps {
  children: ReactNode;
  className?: string;
}

export function FormGroup({ children, className }: FormGroupProps) {
  return <div className={cn("flex flex-col", className)}>{children}</div>;
}
