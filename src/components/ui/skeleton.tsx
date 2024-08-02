import { cn } from "../../lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse bg-gray dark:bg-gray", className)}
      {...props}
    />
  );
}

export { Skeleton }
