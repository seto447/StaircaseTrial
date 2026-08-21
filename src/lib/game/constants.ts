import type {
  ClothingItem,
  EndingDef,
  GameMode,
  GameState,
  OwnedInventory,
  ShopItem,
  Task,
} from "./types";

export const DEFAULT_OWNED_INVENTORY: OwnedInventory = {
  上衣: true,
  长裤: true,
  内裤: true,
  短袜: true,
  护膝: false,
  口球: false,
  贞操锁: false,
  备用内裤: true,
  备用短袜: true,
  水: false,
  纸巾: true,
  袋子: false,
};

export function createDefaultOwnedInventory(
  override?: Partial<OwnedInventory>,
): OwnedInventory {
  return { ...DEFAULT_OWNED_INVENTORY, ...override, 长裤: true };
}

export const TOTAL_FLOORS_NORMAL = 10;
export const TOTAL_FLOORS_HELL = 12;
/** @deprecated 使用 getTotalFloors(mode) */
export const TOTAL_FLOORS_FOR_PROGRESS = TOTAL_FLOORS_NORMAL;
export const TOTAL_PROGRESS_STEPS_NORMAL = 10;
export const TOTAL_PROGRESS_STEPS_HELL = 12;
/** @deprecated 使用 getTotalProgressSteps(mode) */
export const TOTAL_PROGRESS_STEPS = TOTAL_PROGRESS_STEPS_NORMAL;

/** 无跳过券时，花费积分跳过当前任务的消耗 */
export const SKIP_TASK_COST = 6;

export const CLOTHING_ITEMS: ClothingItem[] = [
  "上衣",
  "长裤",
  "内裤",
  "短袜",
  "护膝",
  "口球",
  "贞操锁",
];

/** 计入暴露加成的关键衣物（护膝、口球、贞操锁不计） */
export const KEY_CLOTHING_ITEMS: ClothingItem[] = [
  "上衣",
  "长裤",
  "内裤",
  "短袜",
];

/** 可被剥夺衣物的衣物（贞操锁出发强制佩戴，任务中可临时打开但不被随机剥夺衣物） */
export const STRIPPABLE_CLOTHING_ITEMS: ClothingItem[] = [
  "上衣",
  "长裤",
  "内裤",
  "短袜",
  "护膝",
  "口球",
];

export const TASK_FLOORS_NORMAL = [1, 2, 4, 5, 7, 8] as const;
export const TASK_FLOORS_HELL = [1, 2, 4, 5, 7, 8, 9, 11] as const;
export const TASK_FLOORS = TASK_FLOORS_NORMAL;

export const CLIMBING_DECISION_FLOORS_NORMAL = [2, 5, 8] as const;
export const CLIMBING_DECISION_FLOORS_HELL = [2, 5, 8, 10] as const;
export const CLIMBING_DECISION_FLOORS = CLIMBING_DECISION_FLOORS_NORMAL;

export const NEXT_FLOOR_MAP_NORMAL: Record<number, number> = {
  1: 2,
  4: 5,
  7: 8,
};
export const NEXT_FLOOR_MAP_HELL: Record<number, number> = {
  1: 2,
  4: 5,
  7: 8,
  9: 10,
};
export const NEXT_FLOOR_MAP = NEXT_FLOOR_MAP_NORMAL;

export const CLIMBING_TARGET_MAP_NORMAL: Record<number, number> = {
  2: 4,
  5: 7,
  8: 10,
};
/** 地狱：8 上楼后进入 9（电梯厅外围），再经 10 决策爬至 11（核心），12 结算 */
export const CLIMBING_TARGET_MAP_HELL: Record<number, number> = {
  2: 4,
  5: 7,
  8: 9,
  10: 11,
};
export const CLIMBING_TARGET_MAP = CLIMBING_TARGET_MAP_NORMAL;

export function getTotalFloors(mode: GameMode): number {
  return mode === "hell" ? TOTAL_FLOORS_HELL : TOTAL_FLOORS_NORMAL;
}

export function getTotalProgressSteps(mode: GameMode): number {
  return mode === "hell" ? TOTAL_PROGRESS_STEPS_HELL : TOTAL_PROGRESS_STEPS_NORMAL;
}

export function getTaskFloors(mode: GameMode): readonly number[] {
  return mode === "hell" ? TASK_FLOORS_HELL : TASK_FLOORS_NORMAL;
}

export function getClimbingDecisionFloors(mode: GameMode): readonly number[] {
  return mode === "hell"
    ? CLIMBING_DECISION_FLOORS_HELL
    : CLIMBING_DECISION_FLOORS_NORMAL;
}

export function getNextFloorMap(mode: GameMode): Record<number, number> {
  return mode === "hell" ? NEXT_FLOOR_MAP_HELL : NEXT_FLOOR_MAP_NORMAL;
}

export function getClimbingTargetMap(mode: GameMode): Record<number, number> {
  return mode === "hell" ? CLIMBING_TARGET_MAP_HELL : CLIMBING_TARGET_MAP_NORMAL;
}

function t(
  id: string,
  name: string,
  description: string,
  baseScore: number,
  urineBonus?: number,
): Task {
  return urineBonus !== undefined
    ? { id, name, description, baseScore, urineBonus }
    : { id, name, description, baseScore };
}

export const tasks: Record<string, Task[]> = {
  A: [
    t("A1", "舔脏袜", "穿短袜原地走3圈，然后舔袜面或袜趾，含进嘴里1次（任务后袜子不能擦）", 2),
    t("A2", "揉丁", "跪姿，掏出丁丁揉动", 2),
    t("A3", "狗叼内裤", "内裤脱下后叼嘴中保持10秒", 1),
    t("A4", "短袜自慰", "将短袜套在鸡巴上，撸30秒，不允许射精", 2),
    t("A5", "乳头刺激", "（如有上衣，上衣卷起）两乳头紧贴冷墙1分钟，坚持不发出声音", 1),
    t("A6", "狗姿被操", "狗姿抵墙，连续模拟被操动作10次，并娇喘", 2),
    t("A7", "墙角磨裆", "面对墙角，下体紧贴墙面前后摩擦30次，必须发出轻喘", 2),
    t("A8", "短袜套头", "把脱下的短袜套在鸡巴头上保持1分钟，期间不能碰", 2),
    t("A9", "跪地数台阶", "跪姿从当前层数到下一层，每级台阶必须用舌头轻舔一次", 2),
    t("A11", "冷风吹鸡巴", "打开楼道窗（若有）或对着通风口，让鸡巴完全暴露在风中2分钟", 2),
    t("A12", "镜面摩擦", "在防火门上用鸡巴头轻轻蹭出痕迹，至少蹭出3条水痕", 2),
    t("A13", "轻度憋尿展示", "憋尿至有感觉后，在楼梯转角处把鸡巴掏出，用尿液在地面画一个小圈", 2, 1),
    t("A14", "尿湿短袜", "脱下一只短袜，用少量尿液湿透后重新穿上，继续走完本层", 2, 1),
    t("A15", "尿痕标记", "在墙上用鸡巴头蘸尿液点三个点，形成简单三角标记", 2, 1),
    t("A16", "跪尿", "跪姿把鸡巴压在台阶上，缓慢尿出一小段，然后用舌头舔干净台阶", 3, 2),
    t("A17", "娇喘阶梯", "每上一级台阶必须发出一次明显娇喘，连续10级", 2),
    t("A18", "狗叫爬行", "四肢着地爬行5米，每爬一步发出一声短促狗叫", 2),
    t("A19", "沉默忍耐", "乳头或鸡巴被轻轻捏住（自捏），必须保持完全沉默1分钟", 1),
    t("A20", "边缘低语", "边撸边对着墙缝低声说「我是暴露的狗」重复10次", 2),
    t("A21", "临时口塞", "用自己的内裤塞进嘴里保持30秒，期间必须继续走路", 2),
    t("A22", "短袜绑手腕", "用短袜把自己的双手轻轻绑在背后，保持跪姿1分钟", 2),
    t("A23", "护膝羞耻", "只穿护膝，其余全脱，在转角处保持狗姿30秒", 3),
    t("A24", "衣物堆放", "把脱下的所有衣物整齐叠在台阶上，自己光着在旁边守候1分钟", 3),
    t("A25", "低角度自拍", "从下往上拍3张自己跪姿露鸡巴的照片", 2),
    t("A26", "影子展示", "利用楼道灯光，摆出夸张的勃起影子姿势并拍下", 2),
    t("A27", "倒计时暴露", "设置手机倒计时60秒，期间必须保持全裸下半身站立", 2),
    t("A28", "声音录制", "录制一段自己边撸边娇喘的30秒音频", 2),
    t("A29", "闻自己的味道", "把刚脱下的内裤或短袜捂在鼻子上深吸10次", 1),
    t("A30", "温度对比", "用冰凉的金属扶手贴住龟头保持20秒", 2),
    t("A31", "缓慢脱衣表演", "在楼梯中间用最慢的速度把内裤脱到脚踝，再提起来，重复3次", 2),
    t("A32", "最后一滴", "在任务结束前，必须把鸡巴上残留的前列腺液用手指抹到嘴唇上", 2),
  ],
  B: [
    t("B1", "舔地", "内裤垫地，跪舔1个台阶，舔完后再跪5秒", 3),
    t("B2", "模拟做爱", "光屁股，面对墙撸鸡巴，期间撞墙至少3次，模拟做爱", 3),
    t("B3", "勃起露出", "露出勃起带血管丁丁头，拍3张不同角度的照片", 2),
    t("B4", "夹腿露出", "脱下内裤包住鸡巴，夹腿，保持1分钟", 2),
    t("B5", "全裸露出", "全裸下半身，长裤挂在脖子上，坚持2分钟", 2),
    t("B6", "狗姿摇屁股", "全裸下半身，模仿狗姿势，摇屁股1分钟", 2),
    t("B7", "楼梯扶手摩擦", "用鸡巴沿着扶手来回滑动至少20次，必须留下水痕", 3),
    t("B8", "转角全裸守候", "在转角处全裸下半身站立或跪姿，坚持3分钟", 3),
    t("B9", "双腿大开", "坐在台阶上双腿完全打开，鸡巴朝向可能有人下来的方向保持2分钟", 3),
    t("B10", "屁股朝上", "狗姿但把屁股抬得比头高，保持1分半，期间可轻微摇晃", 2),
    t("B11", "台阶排尿", "选择一级台阶，把鸡巴对准台阶边缘缓慢排尿，必须尿湿至少半级", 3, 2),
    t("B12", "尿后舔净", "排尿后必须用舌头把台阶上的尿液舔到肉眼看不见", 4, 2),
    t("B13", "尿湿内裤再穿", "把内裤脱下，用尿液浸湿后重新穿上，继续完成后续动作", 3, 2),
    t("B14", "标记转角", "在转角墙壁用尿液写一个简单符号（如「狗」）", 3, 2),
    t("B16", "多角度视频", "录制自己全裸下半身从狗姿到站立的完整过程视频（至少45秒）", 3),
    t("B17", "倒计时挑战", "设置2分钟倒计时，期间必须完成「脱内裤→撸20下→再穿上」循环3次", 3),
    t("B19", "影子+实体", "同时拍下自己的影子和实体暴露照片各2张", 2),
    t("B20", "轻打鸡巴", "用手掌轻轻拍打鸡巴两侧各10下，必须发出声音", 2),
    t("B21", "夹紧忍耐", "用双腿把鸡巴紧紧夹住1分钟，期间不能用手碰", 2),
    t("B22", "乳头拉扯", "用力拉扯两边乳头，同时保持勃起姿势30秒", 2),
    t("B23", "短袜堵嘴", "把两只短袜塞进嘴里，保持狗姿1分钟", 2),
    t("B24", "护膝跪行", "只穿护膝，膝盖着地缓慢移动3米", 3),
    t("B25", "防火门摩擦", "用鸡巴在防火门上缓慢画圈，至少画5圈", 2),
    t("B26", "通风口暴露", "把鸡巴伸向通风口，让气流直接吹到龟头2分钟", 2),
    t("B27", "听筒羞耻", "把手机开免提放在身边，假装有人在通话，自己继续暴露", 3),
    t("B29", "寸止一次", "撸到即将高潮时强制停止，冷静30秒后再继续", 3),
    t("B30", "前列腺液收集", "把流出的前列腺液全部用手指收集后抹在自己胸口", 2),
    t("B31", "边缘低语升级", "边边缘边大声说「请路过的主人看狗鸡巴」重复8次", 3),
    t("B32", "双任务连续", "先完成一次狗姿摇屁股，紧接着立刻做一次夹腿露出", 3),
    t("B34", "温度刺激", "用楼道里较凉的金属部分交替刺激龟头与乳头", 2),
    t("B35", "缓慢全脱", "用超过2分钟的时间把所有衣物一件件脱下并整齐放好", 3),
    t("B36", "最终展示", "任务结束前必须保持全裸下半身站在楼梯中间10秒，然后才可穿回", 3),
  ],
  C: [
    t("C1", "狗姿拍摄", "全裸下半身，狗姿，掰开屁股，保持1分钟并拍照", 2),
    t("C2", "鸡巴贴地走", "穿短袜，鸡巴贴地蹲着走，屁股大幅扭动3米", 2),
    t("C3", "超长跪姿暴露", "鸡巴朝楼下，跪势10分钟，鸡巴头暴露不可遮挡", 4),
    t("C4", "寸止挑战", "撸至高潮并寸止2次", 3),
    t("C5", "舔脚游戏", "舔脚趾和脚掌，必须舔完且干净", 4),
    t("C6", "阿努比斯摇", "全裸，跳阿努比斯摇并录制视频", 3),
    t("C7", "全裸爬行", "完全赤裸（含短袜也可脱）四肢着地爬完整层楼梯的一半距离", 4),
    t("C8", "长时间站立暴露", "全裸下半身站在楼梯最显眼处坚持5分钟", 4),
    t("C9", "双层暴露", "同时把上衣完全卷到腋下 + 下半身全裸，保持3分钟", 3),
    t("C10", "转角守候升级", "在转角全裸，且必须把鸡巴朝向可能来人的方向，坚持4分钟", 4),
    t("C11", "完整排尿展示", "在楼梯中间站立，把整泡尿全部尿在台阶上，过程必须被录下", 4, 3),
    t("C12", "尿后全身标记", "用自己的尿液在胸口、大腿、鸡巴上各画一条线", 3, 2),
    t("C13", "尿湿全身", "故意让尿液溅到自己小腿和脚上，然后继续裸着完成后续动作", 3, 2),
    t("C14", "舔尿台阶", "必须把刚才尿过的台阶用舌头清理到基本干净", 4, 3),
    t("C16", "多角度视频升级", "录制完整「脱衣→暴露动作→排尿→再穿」全过程视频（至少90秒）", 4, 2),
    t("C17", "实时倒计时暴露", "设置5分钟倒计时，期间必须保持全裸并每隔30秒换一个姿势", 4),
    t("C18", "声音最大化", "发出尽可能大声的狗叫声，持续1分钟", 3),
    t("C20", "轻打升级", "用手或衣物轻轻抽打鸡巴和屁股各15下", 3),
    t("C21", "强制边缘三次", "连续三次撸到高潮边缘再强制停止，每次间隔至少40秒", 4),
    t("C22", "乳头折磨", "用力拧转乳头同时保持狗姿1分半", 3),
    t("C23", "口塞+暴露", "用内裤或短袜塞嘴，全裸下半身保持跪姿3分钟", 3),
    t("C25", "整层标记", "在本层至少三个不同位置留下尿液或前列腺液痕迹", 4, 3),
    t("C26", "扶手全摩擦", "用鸡巴把整段扶手从头到尾摩擦一遍", 3),
    t("C27", "通风口长时间", "把鸡巴长时间对着通风口，让气流持续刺激至少3分钟", 3),
    t("C28", "听筒+暴露", "把手机开免提，假装通话，同时完成一次完整暴露动作", 3),
    t("C29", "强制寸止两次", "两次寸止后必须冷静满1分钟才能继续", 4),
    t("C30", "前列腺液大量收集", "尽可能多地挤出前列腺液，全部涂在自己脸上或胸口", 3),
    t("C31", "边缘宣言", "边边缘边大声重复「我是楼道里的暴露公狗」15次", 3),
    t("C32", "连续高难度", "先完成一次超长跪姿，紧接着立刻做一次鸡巴贴地走", 4),
    t("C33", "衣物完全丢弃", "把所有衣物丢到楼梯下方或转角，自己全裸完成任务后再取回", 4),
    t("C34", "温度极端刺激", "交替使用最凉的金属与自己的体温刺激敏感部位", 3),
    t("C35", "极慢脱衣仪式", "用超过4分钟的时间一件件脱光，每脱一件必须摆一个姿势", 3),
    t("C36", "最终全裸巡视", "任务结束前必须全裸在本层来回走一圈（至少来回一次）", 4),
    t("C38", "尿液+精液边缘混合", "在边缘状态下滴几滴尿液在鸡巴上，然后继续边缘", 4, 2),
    t("C39", "长时间狗姿+摇", "狗姿保持的同时持续摇屁股满3分钟", 3),
    t("C40", "终极展示", "全裸、勃起、面对可能来人的方向站立，坚持到自己主动结束（最长5分钟）", 4),
  ],
  上楼任务: [
    t("U1", "狗姿上楼", "全程狗姿，仅穿短袜或全裸，往上爬2楼，脚不可着地", 2),
    t("U2", "跪姿上楼", "每上一级台阶膝盖至少落地1次，往上爬2楼", 2),
    t("U3", "露出上楼", "将内裤脱下叼在嘴里，同时下半身全裸，往上爬2楼", 3),
    t("U4", "披风上楼", "裤子挂在脖子上，全裸往上2楼。可自由选择爬or走。", 2),
    t("U5", "边缘上楼", "边撸鸡巴边缘，边爬2层", 3),
    t("U6", "赤脚上楼", "赤脚慢走，每一步需停0.5秒，露出鸡巴", 2),
    t("U7", "全裸爬楼", "完全赤裸四肢着地爬完两层", 3),
    t("U8", "尿迹上楼", "边爬边在每层台阶留下一点尿液痕迹", 3, 2),
    t("U9", "口塞上楼", "嘴里塞着内裤或短袜，全裸或半裸爬两层", 3),
    t("U11", "边尿边上", "在上楼过程中必须释放至少一次尿液", 3, 2),
    t("U12", "倒计时上楼", "设置严格时间限制，超时则额外惩罚（随机脱衣）", 3),
    t("U14", "声音上楼", "每上一级必须发出明显声音（狗叫）", 2),
    t("U15", "摩擦上楼", "鸡巴必须持续与扶手或墙面保持接触", 3),
    t("U16", "临时全脱上楼", "上楼前把所有衣物丢在起始层，全裸爬完再取回", 3),
    t("U17", "多姿势切换", "上楼过程中必须至少切换3种姿势（狗、跪、蹲）", 3),
    t("U18", "边缘坚持上楼", "全程保持边缘状态，不允许射精", 3),
    t("U19", "标记上楼", "每层至少留下一处体液标记", 3, 2),
    t("U20", "缓慢惩罚上楼", "每一步必须停顿至少1秒，全程用最慢速度", 2),
    t("U22", "短袜套头上楼", "短袜套在鸡巴上完成整个上楼过程", 3),
    t("U23", "双层暴露上楼", "上衣卷起 + 下半身全裸爬两层", 3),
    t("U28", "温度刺激上楼", "利用楼道金属持续刺激敏感部位", 2),
    t("U29", "最终冲刺", "最后半层必须用最快速度全裸冲刺", 3),
    t("U30", "完整仪式上楼", "上楼前先完成一次短暴露，再开始爬", 3),
  ],
  H: [
    t("H1", "电梯厅门口站立暴露", "在电梯厅门外全裸下半身站立2分钟，随时可能有人出现", 4),
    t("H2", "电梯按钮区边缘", "在电梯按钮旁边完成一次边缘，必须让鸡巴靠近按钮面板", 4),
    t("H3", "电梯厅中央跪姿", "在电梯厅正中央跪姿全裸，坚持3分钟", 5),
    t("H5", "电梯厅排尿", "在电梯厅角落或垃圾桶旁完成一次完整排尿，并拍摄", 5, 3),
    t("H6", "电梯厅多角度自拍", "必须拍到电梯厅环境 + 自己全裸的照片至少4张", 4),
    t("H7", "实时倒计时高危", "设置4分钟，期间必须在电梯厅保持全裸并换姿势", 5),
    t("H8", "电梯厅狗姿巡视", "全裸狗姿在电梯厅缓慢移动一圈", 4),
    t("H10", "临时全脱冲刺", "把衣物放在远处，全裸跑到电梯厅完成任务后再取回", 5),
    t("H11", "电梯厅标记", "用尿液或前列腺液在电梯厅隐蔽处留下标记", 4, 3),
    t("H13", "电梯厅长时间守候", "选择一个相对角落，全裸坚持5分钟", 5),
    t("H14", "按钮摩擦", "用鸡巴轻轻摩擦电梯按钮面板（不实际按）", 4),
    t("H15", "电梯厅寸止", "在电梯厅完成两次强制寸止", 5),
    t("H16", "口塞+电梯厅", "嘴里塞着衣物，全裸在电梯厅保持跪姿2分钟", 4),
    t("H17", "电梯厅最终展示", "全裸勃起面向电梯门站立，直到自己主动结束", 5),
    t("H18", "排尿+边缘混合", "在电梯厅先排尿再立刻进入边缘状态", 5, 3),
    t("H19", "多位置快速暴露", "在电梯厅至少三个不同位置各停留20秒全裸", 4),
    t("H20", "强制拍摄环境", "必须把电梯厅的监控摄像头方向也拍进照片（制造被拍风险感）", 5),
    t("H21", "缓慢脱衣仪式（电梯厅版）", "在电梯厅用最慢速度脱光", 4),
    t("H22", "电梯厅爬行", "全裸爬行穿过电梯厅", 5),
    t("H24", "终极地狱", "全裸 + 排尿 + 边缘 + 拍摄，全部在电梯厅连续完成", 6, 3),
  ],
};

export const endingsNormal: EndingDef[] = [
  { minScore: 40, description: "完全自主：可选择任何射精方式与地点，甚至可以干净回家" },
  { minScore: 30, description: "短袜接精 + 含袜10秒后可回家" },
  { minScore: 20, description: "全裸跪地射精，必须用身体或舌头清理干净" },
  { minScore: 10, description: "精液射在身上多处，拍摄后必须舔净" },
  { minScore: 1, description: "禁止射精，裸体罚跪15分钟，戴贞操锁3天，短袜塞嘴回家" },
  /** 结算不直接展示；由 resolveEnding 抽出一项 C 级任务后再落到上一档正文 */
  { minScore: 0, description: "额外惩罚：当场再完成一次随机C级任务后，再执行1–9分结局" },
];

export const endingsHell: EndingDef[] = [
  { minScore: 50, description: "地狱豁免：可立即回家，并获得「地狱幸存者」称号" },
  { minScore: 35, description: "电梯厅公开边缘：必须在电梯厅完成一次公开边缘后才可射精" },
  { minScore: 20, description: "电梯厅排尿展示 + 射精" },
  { minScore: 10, description: "电梯厅全裸罚跪 + 强制拍摄" },
  { minScore: 0, description: "最严厉：电梯厅全裸 + 排尿 + 禁止射精 + 贞操锁7天 + 短袜塞嘴" },
];

/** @deprecated 使用 endingsNormal / getEnding(score, mode) */
export const endings = endingsNormal;

export const shopItems: ShopItem[] = [
  {
    id: "长裤",
    name: "长裤",
    description: "遮盖下半身",
    price: 5,
    required: true,
    type: "clothing",
    clothingKey: "长裤",
  },
  {
    id: "上衣",
    name: "上衣",
    description: "遮挡上半身",
    price: 4,
    type: "clothing",
    clothingKey: "上衣",
  },
  {
    id: "内裤",
    name: "内裤",
    description: "遮住你最私密的部位",
    price: 4,
    type: "clothing",
    clothingKey: "内裤",
  },
  {
    id: "短袜",
    name: "短袜",
    description: "避免楼道的灰尘粘在脚上",
    price: 2,
    type: "clothing",
    clothingKey: "短袜",
  },
  {
    id: "护膝",
    name: "护膝",
    description: "减少膝盖擦伤",
    price: 2,
    type: "clothing",
    clothingKey: "护膝",
  },
  {
    id: "口球",
    name: "口球",
    description: "可降低部分发声惩罚，但增加窒息感",
    price: 3,
    type: "clothing",
    clothingKey: "口球",
  },
  {
    id: "贞操锁",
    name: "贞操锁",
    description: "出发时强制佩戴，任务中可临时打开，结算时再判定是否继续锁",
    price: 7,
    type: "clothing",
    clothingKey: "贞操锁",
  },
  {
    id: "skip",
    name: "跳过任务券",
    description: "任意跳过一次任务（可叠加）",
    price: 6,
    type: "skip",
  },
  {
    id: "restore",
    name: "恢复内裤券",
    description: "恢复被脱掉的内裤（限购1次）",
    price: 8,
    type: "restore",
  },
  {
    id: "delayStrip",
    name: "延迟剥夺衣物券",
    description: "一次剥夺衣物判定可推迟到下一层",
    price: 5,
    type: "delayStrip",
  },
  {
    id: "riskDouble",
    name: "风险加倍券",
    description: "本局暴露加成×1.5，但剥夺衣物概率升至70%",
    price: 4,
    type: "riskDouble",
  },
  {
    id: "hellPass",
    name: "电梯厅通行证",
    description: "允许进入地狱模式的电梯厅任务（限购1）",
    price: 12,
    type: "hellPass",
    hellOnly: true,
  },
];

export function createInitialGameState(
  startingFloor = 1,
  mode: GameMode = "normal",
): GameState {
  // 初始积分 0-22（语义 5-27，5 分预留给必购长裤）；地狱模式额外 -3
  let score = Math.floor(Math.random() * 23);
  if (mode === "hell") {
    score = Math.max(0, score - 3);
  }
  return {
    score,
    currentFloor: 1,
    maxFloor: 1,
    startingFloor,
    gamePhase: "initial",
    mode,
    selectedMode: mode,
    clothing: {
      上衣: false,
      长裤: false,
      内裤: false,
      短袜: false,
      护膝: false,
      口球: false,
      贞操锁: false,
    },
    currentTask: null,
    taskMessage: null,
    tasksCompleted: 0,
    tasksCompletedInPhase: { A: 0, B: 0, C: 0, H: 0 },
    currentPhase: "A",
    inventory: {
      skip: 0,
      restore: 0,
      delayStrip: 0,
      riskDouble: 0,
      hellPass: 0,
    },
    assignedClimbingTask: null,
    eighthFloorFirstTaskCompleted: false,
    hasBoughtRestore: false,
    hasBoughtHellPass: false,
    hasBoughtRiskDouble: false,
    riskDoubleActive: false,
    pendingDelayedStrip: false,
    urineMarks: 0,
    hellTasksCompleted: 0,
    progressStepsCompleted: 0,
    owned: createDefaultOwnedInventory(),
    missionPlan: null,
    resolvedEnding: null,
  };
}

export function getDisplayFloor(
  internalFloor: number,
  startingFloor: number,
): number {
  return internalFloor + startingFloor - 1;
}

export function getEnding(score: number, mode: GameMode = "normal"): string {
  const list = mode === "hell" ? endingsHell : endingsNormal;
  for (const ending of list) {
    if (score >= ending.minScore) {
      return ending.description;
    }
  }
  return list[list.length - 1].description;
}

export function getProgressPercent(state: GameState): number {
  if (state.gamePhase === "ended") return 100;
  const total = getTotalProgressSteps(state.mode);
  return Math.min(100, (state.progressStepsCompleted / total) * 100);
}

export function getTaskPoolForFloor(
  floor: number,
  mode: GameMode = "normal",
): { pool: Task[]; phase: string } | null {
  if (floor === 1 || floor === 2) return { pool: tasks.A, phase: "A" };
  if (floor === 4 || floor === 5) return { pool: tasks.B, phase: "B" };
  if (floor === 7 || floor === 8) return { pool: tasks.C, phase: "C" };
  if (mode === "hell" && (floor === 9 || floor === 11)) {
    return { pool: tasks.H, phase: "H" };
  }
  return null;
}

export function pickRandomTask(pool: Task[], excludeId?: string): Task {
  if (pool.length === 0) {
    throw new Error("Task pool is empty");
  }
  if (!excludeId || pool.length === 1) {
    return pool[Math.floor(Math.random() * pool.length)];
  }
  let task: Task;
  do {
    task = pool[Math.floor(Math.random() * pool.length)];
  } while (task.id === excludeId);
  return task;
}

export function calculateTaskScore(state: GameState): number {
  if (!state.currentTask) return 0;
  const baseScore = state.currentTask.baseScore;
  const wornCount = KEY_CLOTHING_ITEMS.filter(
    (item) => state.clothing[item],
  ).length;
  let clothingBonus = KEY_CLOTHING_ITEMS.length - wornCount;
  // 地狱模式暴露加成额外 +1
  if (state.mode === "hell") {
    clothingBonus += 1;
  }
  // 风险加倍券：暴露加成 ×1.5
  if (state.riskDoubleActive) {
    clothingBonus = Math.floor(clothingBonus * 1.5);
  }
  const urineBonus = state.currentTask.urineBonus ?? 0;
  return baseScore + clothingBonus + urineBonus;
}

export function getWornClothingCount(state: GameState): number {
  return Object.values(state.clothing).filter(Boolean).length;
}

/** 剥夺衣物触发阈值：普通 ≤3(50%)；地狱/风险加倍 ≤4(66%)；风险加倍升至 70%≈≤4.2 用 ≤4 */
export function getStripDiceThreshold(state: GameState): number {
  if (state.riskDoubleActive) return 4; // ~66–70%
  if (state.mode === "hell") return 4;
  return 3;
}

/** 保留衣物费用：普通 5；地狱电梯厅任务 8 */
export function getKeepClothingCost(state: GameState): number {
  if (state.mode === "hell" && (state.currentFloor === 9 || state.currentFloor === 11)) {
    return 8;
  }
  return 5;
}

export function viewFromPhase(phase: GameState["gamePhase"]): import("./types").AppView {
  switch (phase) {
    case "shop":
      return "shop";
    case "adventure":
      return "game";
    case "ended":
      return "end";
    default:
      return "start";
  }
}
