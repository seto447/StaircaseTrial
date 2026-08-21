import { useEffect, useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { loadOwnedInventoryFromStorage, saveOwnedInventoryToStorage } from "@/lib/game/storage";
import type { GameMode, OwnedInventory } from "@/lib/game/types";
import { useGameStore } from "@/lib/game/store";
import { cn } from "@/lib/utils";

export function StartSection() {
  const startGame = useGameStore((s) => s.startGame);
  const setHellPreview = useGameStore((s) => s.setHellPreview);
  const [startingFloor, setStartingFloor] = useState(1);
  const [mode, setMode] = useState<GameMode>("normal");
  const [owned, setOwned] = useState<OwnedInventory>(() => loadOwnedInventoryFromStorage());

  useEffect(() => {
    const next = loadOwnedInventoryFromStorage();
    setOwned(next);
    saveOwnedInventoryToStorage(next);
  }, []);

  useEffect(() => {
    setHellPreview(mode === "hell");
    return () => setHellPreview(false);
  }, [mode, setHellPreview]);

  const endFloor = startingFloor + (mode === "hell" ? 11 : 9);

  const toggleKneepads = () => {
    setOwned((prev) => {
      const next = { ...prev, 护膝: !prev.护膝 };
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

          <button
            type="button"
            onClick={toggleKneepads}
            className={cn(
              "mt-4 inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm transition-colors",
              owned.护膝
                ? "border-foreground/30 bg-muted/50"
                : "border-border text-muted-foreground hover:bg-muted/50",
            )}
          >
            {owned.护膝 && <Check className="size-3.5" />}
            我有护膝
          </button>

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
