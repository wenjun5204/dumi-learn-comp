# @regan-ad/base-ui

基础 UI 组件库，提供常用的 React 组件。

## 📦 包含组件

- **Button** - 按钮组件
- **Input** - 输入框组件
- **Select** - 选择器组件

## 🚀 快速开始

### 安装

```bash
pnpm install @regan-ad/base-ui
```

### 使用

```tsx
import { Button, Input, Select } from '@regan-ad/base-ui';

export default function App() {
  return (
    <>
      <Button>Click me</Button>
      <Input placeholder="Enter text" />
      <Select options={[]} />
    </>
  );
}
```

## 📝 开发

### 构建

```bash
# 构建组件库
pnpm build

# 监听模式
pnpm build:watch
```

### 开发文档

在项目根目录运行：

```bash
pnpm docs:dev
```

然后访问 `http://localhost:8000/components/base-ui` 查看组件文档。

## 📋 输出格式

构建后会生成以下文件：

- `dist/index.js` - ESM 格式（现代模块）
- `dist/index.cjs.js` - CommonJS 格式（Node.js 兼容）
- `dist/index.d.ts` - TypeScript 类型声明
- `dist/*.js.map` - Source Maps（调试用）

## 🔗 依赖

- **Peer Dependencies**: `react >= 16.9.0`, `react-dom >= 16.9.0`
- **Dependencies**: `@regan-ad/shared`

## 📄 License

MIT
