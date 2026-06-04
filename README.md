# UI Component Library

一个基于 **React + TypeScript + Rollup + Monorepo** 架构的企业级组件库，支持按需引入、ESM/CJS 双构建、Tree Shaking 优化。

---

## ✨ 特性

- 🚀 支持 ESM / CJS 双产物输出
- 📦 支持按需加载（preserveModules）
- 🧠 完整 TypeScript 类型支持
- 🎨 内置 SCSS / CSS Modules 支持
- ⚡ Rollup 高性能打包
- 🔧 Monorepo 管理（pnpm workspace）
- 🪄 支持 tree-shaking
- 🧹 生产环境自动压缩（terser）

---

## 📁 项目结构

```bash
packages/
├── components   # 组件库（Button / Modal / Input）
├── hooks        # React Hooks 工具库
└── utils        # 工具函数（md5 / date / request）

# docs/            # 文档站点（可选 Next.js / VitePress）
# playground/      # 组件调试环境
```
