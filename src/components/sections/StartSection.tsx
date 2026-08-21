import { useEffect, useMemo, useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { OWNED_ITEM_DEFS } from "@/lib/game/advisor";
import { loadOwnedInventoryFromStorage, saveOwnedInventoryToStorage } from "@/lib/game/storage";
import type { GameMode, OwnedInventory, OwnedItemId } from "@/lib/game/types";
import { useGameStore } from "@/lib/game/store";
import { cn } from "@/lib/utils";

export function StartSection() {
  const startGame = useGameStore((s) => s.startGame);
  const setHellPreview = useGameStore((s) => s.setHellPreview);
  const [startingFloor, setStartingFloor] = useState(1);
  const [mode, setMode] = useState<GameMode>("normal");
  const [owned, setOwned] = useState<OwnedInventory>(() => loadOwnedInventoryFromStorage());

  useEffect(() => {
    setHellPreview(mode === "hell");
    return () => setHellPreview(false);
  }, [mode, setHellPreview]);

  const endFloor = startingFloor + (mode === "hell" ? 11 : 9);

  const skippedMust = useMemo(
    () =>
      OWNED_ITEM_DEFS.filter(
        (d) => d.importance === "strongly_recommended" && !owned[d.id],
      ),
    [owned],
  );

  const toggleOwned = (id: OwnedItemId, importance: (typeof OWNED_ITEM_DEFS)[number]["importance"]) => {
    if (importance === "required") return;
    setOwned((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      saveOwnedInventoryToStorage(next);
      return next;
    });
  };

  return (
    <div className="space-y-6">
      <h1 className="pt-2 text-[28px] font-semibold leading-[1.05] tracking-tight sm:pt-4 sm:text-[34px]">
        混凝土楼道里，
        <br />
        怎么藏着一只全裸的贱狗？
      </h1>

      <Card className="overflow-hidden py-0">
        <CardContent className="p-4 sm:p-5">
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setMode("normal")}
              className={cn(
                "rounded-lg border px-3 py-2.5 text-sm font-medium transition-colors",
                mode === "normal"
                  ? "border-foreground bg-foreground text-background"
                  : "border-border bg-card hover:bg-muted/50",
              )}
            >
              普通
            </button>
            <button
              type="button"
              onClick={() => setMode("hell")}
              data-active={mode === "hell" ? "true" : "false"}
              aria-pressed={mode === "hell"}
              className={cn(
                "hell-select-card rounded-lg border px-3 py-2.5 text-sm font-medium",
                mode === "hell" ? "" : "border-border bg-card hover:bg-muted/50",
              )}
            >
              <span className="hell-card-scorch" aria-hidden="true" />
              <span className="hell-card-rim" aria-hidden="true" />
              <span className="hell-card-sparks" aria-hidden="true">
                <span style={{ left: "22%" }} />
                <span style={{ left: "51%" }} />
                <span style={{ left: "78%" }} />
              </span>
              <span className="hell-select-title">地狱</span>
            </button>
          </div>

          <div className="mt-4 flex items-center justify-between gap-3">
            <p className="text-sm">
              {startingFloor}
              <span className="text-muted-foreground"> → {endFloor} 层</span>
            </p>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                className="size-10 shrink-0"
                onClick={() => setStartingFloor((v) => Math.max(1, v - 1))}
                aria-label="减一层"
              >
                −
              </Button>
              <Input
                id="startingFloor"
                type="number"
                inputMode="numeric"
                min={1}
                max={99}
                value={startingFloor}
                onChange={(e) => {
                  const raw = e.target.value;
                  if (raw === "") {
                    setStartingFloor(1);
                    return;
                  }
                  const n = Number(raw);
                  if (!Number.isFinite(n)) return;
                  setStartingFloor(Math.max(1, Math.min(99, Math.floor(n))));
                }}
                className="h-10 w-16 text-center text-base font-semibold tabular-nums"
              />
              <Button
                variant="outline"
                size="icon"
                className="size-10 shrink-0"
                onClick={() => setStartingFloor((v) => Math.min(99, v + 1))}
                aria-label="加一层"
              >
                +
              </Button>
            </div>
          </div>

          <div className="mt-5 border-t pt-4">
            <p className="text-sm font-medium">我有的</p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {OWNED_ITEM_DEFS.map((item) => (
                <OwnedToggle
                  key={item.id}
                  selected={owned[item.id]}
                  label={item.name}
                  locked={item.importance === "required"}
                  hint={item.hint}
                  onClick={() => toggleOwned(item.id, item.importance)}
                />
              ))}
            </div>
            {skippedMust.length > 0 && (
              <p className="mt-2 text-xs text-destructive">
                未勾选{skippedMust.map((i) => i.name).join("、")}
              </p>
            )}
          </div>

          <Button
            size="lg"
            data-hell={mode === "hell" ? "true" : "false"}
            className={cn(
              "mt-4 h-12 w-full text-base font-semibold",
              mode === "hell" && "hell-start-btn",
            )}
            onClick={() => startGame(startingFloor, mode, owned)}
          >
            {mode === "hell" && <span className="hell-btn-heat" aria-hidden="true" />}
            {mode === "hell" && <span className="hell-btn-grain" aria-hidden="true" />}
            <span className="hell-start-label">开始</span> <ArrowRight className="size-4" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

function OwnedToggle({
  selected,
  label,
  locked,
  hint,
  onClick,
}: {
  selected: boolean;
  label: string;
  locked: boolean;
  hint: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      title={hint}
      disabled={locked}
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm transition-colors",
        selected
          ? "border-foreground/30 bg-muted/50"
          : "border-border text-muted-foreground hover:bg-muted/50",
      )}
    >
      {selected && <Check className="size-3.5" />}
      {label}
    </button>
  );
}
