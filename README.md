# StaircaseTrial

楼道暴露挑战 — 基于网页的冒险游戏。玩家需要在楼道中向上攀爬，完成随机生成的挑战任务，管理积分和物品，最终根据得分达成不同的结局。

在线体验：[https://hulifoxi.github.io/StaircaseTrial/](https://hulifoxi.github.io/StaircaseTrial/)

## 功能特性

- **爬楼机制**：从第 1 层开始，逐层向上挑战
- **随机任务系统**：楼内任务与上楼任务交替推进
- **积分系统**：根据任务完成情况、穿着状态等计算得分
- **商店系统**：购买衣物和道具（跳过任务券、恢复内裤券）
- **物品库存**：管理和使用购买的道具
- **多结局判定**：根据最终得分决定不同的游戏结局
- **本地存档**：自动保存游戏进度与历史记录（最多 10 条）
- **响应式界面**：基于 shadcn/ui 的现代暗色主题 UI

## 本地开发

```bash
npm install
npm run dev
```

## 构建与预览

```bash
npm run build
npm run preview
```

## 部署到 GitHub Pages

项目已配置 Vite `base: '/StaircaseTrial/'` 与 GitHub Actions 工作流。推送至 `main` 分支后会自动构建并部署。

首次使用前，请在仓库 **Settings → Pages** 中将 Source 设为 **GitHub Actions**。

## 技术栈

- [Vite](https://vite.dev/) + [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Zustand](https://zustand.docs.pmnd.rs/)（状态管理）
- [Sonner](https://sonner.emilkowal.ski/)（通知提示）
- 浏览器 `localStorage`（存档）

## 许可证

GPL-3.0
