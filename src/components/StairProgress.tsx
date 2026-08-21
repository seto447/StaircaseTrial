import { cn } from "@/lib/utils";

interface StairProgressProps {
  completed: number;
  total?: number;
  floorLabel?: string;
  startLabel?: string;
  endLabel?: string;
  /** 从此下标起为地狱加层：该格是任务层，最后一格是结算 */
  hellFrom?: number;
  className?: string;
}

export function StairProgress({
  completed,
  total = 10,
  floorLabel,
  startLabel = "开始",
  endLabel = "终局",
  hellFrom,
  className,
}: StairProgressProps) {
  const steps = Array.from({ length: total }, (_, i) => i);
  const current = Math.min(Math.max(0, completed), total);
  const onHellTask = hellFrom != null && current === hellFrom;
  const stepRise = total > 10 ? 2.4 : 3;

  return (
    <div className={cn("w-full", floorLabel && "pt-5", className)}>
      <div
        className="relative flex items-end gap-[2px]"
        role="img"
        aria-label={
          hellFrom != null
            ? `楼层 ${startLabel} 至 ${endLabel}，共 ${total} 层，末层为结算`
            : `楼层 ${startLabel} 至 ${endLabel}，共 ${total} 层`
        }
      >
        {floorLabel && current < total && (
          <span
            className={cn(
              "pointer-events-none absolute -top-5 -translate-x-1/2 rounded px-1.5 py-0.5 text-[10px] font-medium leading-none",
              onHellTask
                ? "stair-floor-label-hell"
                : "bg-foreground text-background",
            )}
            style={{ left: `${((current + 0.5) / total) * 100}%` }}
          >
            {floorLabel}
          </span>
        )}
        {steps.map((i) => {
          const lit = i < current;
          const isCurrent = i === current && current < total;
          const isHellTask = hellFrom != null && i === hellFrom;
          const isHellEnd = hellFrom != null && i === total - 1;
          const height =
            10 +
            i * stepRise +
            (isHellTask ? 4 : 0) +
            (isHellEnd ? 8 : 0);
          return (
            <div
              key={i}
              style={{ height: `${height}px` }}
              className={cn(
                "flex-1 rounded-sm border",
                isHellTask && "stair-step-hell stair-step-hell-gate",
                isHellTask && lit && "is-lit",
                isHellTask && isCurrent && "is-current",
                isHellEnd && "stair-step-end",
                !isHellTask && !isHellEnd && lit && "border-foreground/20 bg-foreground",
                !isHellTask && !isHellEnd && isCurrent && "border-foreground bg-foreground",
                !isHellTask && !isHellEnd && !lit && !isCurrent && "border-border bg-muted",
              )}
            />
          );
        })}
      </div>
      <div className="mt-2 flex justify-between text-[11px] text-muted-foreground">
        <span>{startLabel}</span>
        <span className={cn(hellFrom != null && "stair-end-hell")}>{endLabel}</span>
      </div>
    </div>
  );
}
