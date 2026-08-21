import { useEffect } from "react";
import { Toaster } from "sonner";
import { AppHeader } from "@/components/AppHeader";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import { DebugTerminal } from "@/components/DebugTerminal";
import { HellBorderEffect } from "@/components/HellBorderEffect";
import { EndSection } from "@/components/sections/EndSection";
import { GameSection } from "@/components/sections/GameSection";
import { HistorySection } from "@/components/sections/HistorySection";
import { RulesSection } from "@/components/sections/RulesSection";
import { BriefingSection } from "@/components/sections/BriefingSection";
import { ShopSection } from "@/components/sections/ShopSection";
import { StartSection } from "@/components/sections/StartSection";
import { useTheme } from "@/components/theme-provider";
import { useDebugMode } from "@/hooks/useDebugMode";
import { useGameStore } from "@/lib/game/store";
import { cn } from "@/lib/utils";

function App() {
  const view = useGameStore((s) => s.view);
  const hydrate = useGameStore((s) => s.hydrate);
  const mode = useGameStore((s) => s.state.mode);
  const hellPreview = useGameStore((s) => s.hellPreview);
  const hellActive = mode === "hell" || hellPreview;
  const debug = useDebugMode();
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [view]);

  return (
    <div
      className={cn(
        "min-h-screen relative transition-[background-color] duration-700",
        hellActive ? "hell-ui" : "bg-background",
      )}
    >
      <HellBorderEffect active={hellActive} />
      <AppHeader debugActive={debug.active} onTitleClick={debug.handleTitleClick} />

      <div className="relative z-10 mx-auto max-w-[720px] px-4 pb-10 pt-4 sm:px-6 sm:pt-6">
        <main key={view} className="view-enter">
          {view === "start" && <StartSection />}
          {view === "rules" && <RulesSection />}
          {view === "shop" && <ShopSection />}
          {view === "briefing" && <BriefingSection />}
          {view === "game" && <GameSection />}
          {view === "end" && <EndSection />}
          {view === "history" && <HistorySection />}
        </main>

        <footer className="mt-10 border-t pt-4 text-center">
          <p className="text-xs leading-relaxed text-muted-foreground">
            虚构模拟，请遵守法律与场地规则，感到不适请停止。
          </p>
          <p className="mt-2 text-xs text-muted-foreground">v3.1</p>
        </footer>
      </div>

      <ConfirmDialog />
      <Toaster position="top-center" richColors closeButton theme={resolvedTheme} />
      <DebugTerminal
        visible={debug.visible}
        logs={debug.logs}
        onClear={debug.clearLogs}
        onClose={debug.hideTerminal}
        onCopy={debug.copyLogs}
        onDeactivate={debug.deactivate}
      />
    </div>
  );
}

export default App;
