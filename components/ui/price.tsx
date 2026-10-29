import { formatNaira } from "@/lib/format";
import { cn } from "@/lib/utils";

export function Price({
  amount,
  compareAt,
  className,
}: {
  amount: number;
  compareAt?: number;
  className?: string;
}) {
  const onSale = Boolean(compareAt && compareAt > amount);
  return (
    <div className={cn("flex items-baseline gap-2", className)}>
      <span className="text-sm tracking-wide">{formatNaira(amount)}</span>
      {onSale ? (
        <span className="text-xs text-muted line-through">{formatNaira(compareAt!)}</span>
      ) : null}
    </div>
  );
}
