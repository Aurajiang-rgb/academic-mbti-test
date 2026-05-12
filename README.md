# 科研发疯综合征确诊指南：测测你的「学术怨气值」（Vite + React + Tailwind）

移动端 H5 单页测评：**着陆页 → 10 题（进度条 + 选项自动下一题）→ 结果页（画像 + html2canvas 导出海报）**。

## 本地运行

在项目根目录执行：

```bash
npm install
npm run dev
```

浏览器打开终端提示的本地地址即可。

## 构建

```bash
npm run build
npm run preview
```

## 说明

- **题库/结果**：写在 `src/data/quiz.js` 与 `src/data/results.js`
- **计分**：`src/utils/scoring.js`
- **海报导出**：`html2canvas`（结果页提供下载按钮；移动端也可长按预览保存）
