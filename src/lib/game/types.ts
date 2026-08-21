export type GamePhase = "initial" | "shop" | "adventure" | "ended";

export type GameMode = "normal" | "hell";

export type ClothingItem =
  | "上衣"
  | "长裤"
  | "内裤"
  | "短袜"
  | "护膝";

export type AppView =
  | "start"
  | "rules"
  | "shop"
  | "briefing"
  | "game"
  | "end"
  | "history";

export type OwnedItemId = ClothingItem;

export type OwnedInventory = Record<OwnedItemId, boolean>;

export type ItemImportance =
  | "required"
  | "strongly_recommended"
  | "recommended"
  | "optional";

export interface Task {
  id: string;
  name: string;
  description: string;
  baseScore: number;
  /** 任务涉及排尿/标记时的额外加分 1–3 */
  urineBonus?: number;
}

export interface ClimbingTask extends Task {
  targetFloor: number;
}

export interface MissionPlan {
  floorTasks: Record<number, Task[]>;
  climbingTasks: Record<number, Task>;
}

export interface Inventory {
  skip: number;
  restore: number;
  delayStrip: number;
  riskDouble: number;
  hellPass: number;
}

export interface GameState {
  score: number;
  currentFloor: number;
  maxFloor: number;
  startingFloor: number;
  gamePhase: GamePhase;
  mode: GameMode;
  /** 开局选择的模式（商店购入通行证可临时升为 hell，退货时回退） */
  selectedMode: GameMode;
  clothing: Record<ClothingItem, boolean>;
  currentTask: Task | null;
  taskMessage: string | null;
  tasksCompleted: number;
  tasksCompletedInPhase: { A: number; B: number; C: number; H: number };
  currentPhase: string;
  inventory: Inventory;
  assignedClimbingTask: ClimbingTask | null;
  eighthFloorFirstTaskCompleted: boolean;
  hasBoughtRestore: boolean;
  hasBoughtHellPass: boolean;
  hasBoughtRiskDouble: boolean;
  riskDoubleActive: boolean;
  /** 延迟剥夺衣物：下一层完成任务时强制触发一次剥夺衣物判定 */
  pendingDelayedStrip: boolean;
  urineMarks: number;
  hellTasksCompleted: number;
  progressStepsCompleted: number;
  /** 玩家实际拥有的实物（开局勾选，与商店穿戴分开） */
  owned: OwnedInventory;
  /** 出发前预抽的全程任务；旧存档可能为 null */
  missionPlan: MissionPlan | null;
  /** 结算时抽出的结局正文；0 分会含加罚任务，旧存档可能为 null */
  resolvedEnding: string | null;
  /** 商店阶段已重随积分次数，最多 2 */
  scoreRerollsUsed: number;
}

export interface GameHistoryRecord {
  timestamp: string;
  finalScore: number;
  maxFloor: number;
  tasksCompleted: number;
  remainingClothes: number;
  ending: string;
  mode?: GameMode;
  hellTasksCompleted?: number;
  urineMarks?: number;
}

export type ShopItemType =
  | "clothing"
  | "skip"
  | "restore"
  | "delayStrip"
  | "riskDouble"
  | "hellPass";

export interface ShopItem {
  id: string;
  name: string;
  description: string;
  price: number;
  required?: boolean;
  type: ShopItemType;
  clothingKey?: ClothingItem;
  /** 仅地狱模式可见 */
  hellOnly?: boolean;
}

export interface ConfirmOptions {
  yesText?: string;
  noText?: string;
  showNoButton?: boolean;
}

export interface EndingDef {
  minScore: number;
  description: string;
}
