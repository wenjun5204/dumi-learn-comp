---
title: 组件开发调试指引
order: 2
---

# 组件开发调试指引

本文档介绍如何在 Monorepo 中开发、调试和测试组件。

## 开发环境准备

### 环境要求

- Node.js >= 16.0.0
- pnpm >= 8.0.0

### 安装依赖

```bash
# 克隆仓库后安装所有依赖
pnpm install
```

### 目录结构

每个组件遵循以下目录结构：

```
packages/base-ui/src/Button/
├── index.tsx    # 组件源码
└── index.md     # 组件文档（dumi 自动解析为文档页面）
```

## 新增组件

### 1. 创建组件源码

在对应包的 `src/` 目录下创建组件文件夹，包含 `index.tsx`：

```bash
# 示例：在 base-ui 中新增 Switch 组件
mkdir packages/base-ui/src/Switch
```

```ts
// packages/base-ui/src/Switch/index.tsx
import React, { useState } from 'react';

export interface SwitchProps {
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
}

export const Switch: React.FC<SwitchProps> = ({
  checked,
  defaultChecked = false,
  disabled = false,
  onChange,
}) => {
  const [innerChecked, setInnerChecked] = useState(defaultChecked);
  const isControlled = checked !== undefined;
  const currentChecked = isControlled ? checked : innerChecked;

  const handleClick = () => {
    if (disabled) return;
    const next = !currentChecked;
    if (!isControlled) setInnerChecked(next);
    onChange?.(next);
  };

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={handleClick}
      style={{
        width: 44,
        height: 22,
        borderRadius: 11,
        border: 'none',
        background: currentChecked ? '#1890ff' : '#ccc',
        cursor: disabled ? 'not-allowed' : 'pointer',
        position: 'relative',
        transition: 'background 0.2s',
      }}
    >
      <span
        style={{
          position: 'absolute',
          top: 2,
          left: currentChecked ? 24 : 2,
          width: 18,
          height: 18,
          borderRadius: '50%',
          background: '#fff',
          transition: 'left 0.2s',
        }}
      />
    </button>
  );
};

export default Switch;
```

### 2. 创建组件文档

在同目录下创建 `index.md`，dumi 会自动解析为文档页面：

```markdown
# Switch 开关

开关组件，用于在两种状态间切换。

## 基础用法

\`\`\`tsx
import { Switch } from '@regan-ad/base-ui';

export default () => <Switch defaultChecked />;
\`\`\`

## 禁用状态

\`\`\`tsx
import { Switch } from '@regan-ad/base-ui';

export default () => <Switch disabled />;
\`\`\`

## API

| 属性 | 类型 | 说明 | 默认值 |
|------|------|------|--------|
| checked | boolean | 是否选中（受控） | - |
| defaultChecked | boolean | 默认是否选中 | `false` |
| disabled | boolean | 是否禁用 | `false` |
| onChange | `(checked: boolean) => void` | 变更回调 | - |
```

### 3. 导出组件

在包的 `src/index.ts`（或 `src/index.tsx`）中添加导出：

```ts
// packages/base-ui/src/index.ts
export { default as Button } from './Button';
export { default as Input } from './Input';
export { default as Select } from './Select';
export { default as Tag } from './Tag';
export { default as Space } from './Space';
export { default as Switch } from './Switch'; // 新增
```

### 4. 验证文档

```bash
# 启动文档开发服务器
pnpm docs:dev
```

打开浏览器访问 `http://localhost:8000`，在左侧导航「组件」中即可看到新增的 Switch 组件文档。

## 文档编写规范

### frontmatter 配置

每个组件文档的 `index.md` 可通过 frontmatter 控制展示：

```markdown
---
title: Switch 开关
---

# Switch 开关
```

### Demo 编写规范

dumi 会自动将代码块中的 `tsx` 代码渲染为可交互的 demo：

```markdown
## 基础用法

\`\`\`tsx
import { Switch } from '@regan-ad/base-ui';

export default () => <Switch defaultChecked />;
\`\`\`
```

**要点：**
- 每个 demo 代码块必须 `export default` 一个 React 组件
- 代码块语言标记为 `tsx`
- import 的包名需要与 `alias` 配置一致（如 `@regan-ad/base-ui`）

### API 表格规范

使用 Markdown 表格描述 Props，dumi 也支持 `<API id="ComponentName" />` 自动从 TypeScript 类型生成：

```markdown
## API

| 属性 | 类型 | 说明 | 默认值 |
|------|------|------|--------|
| checked | boolean | 是否选中 | - |
| disabled | boolean | 是否禁用 | false |
```

## 开发调试

### 文档热更新

```bash
pnpm docs:dev
```

- 修改组件源码（`.tsx`）→ 页面实时刷新
- 修改组件文档（`.md`）→ 页面实时刷新
- 无需重新构建库包，dumi 通过 `alias` 直接引用各包 `src` 源码

### 单包构建验证

开发完成后，单独构建当前包验证产物是否正确：

```bash
# 构建 base-ui
pnpm build:ui

# 构建 base-form
pnpm build:form

# 构建指定包（按 Turbo 拓扑排序，自动先构建依赖）
pnpm build:shared
```

### 监听模式构建

如果需要实时构建产物（如供其他项目通过 `link` 调试）：

```bash
# 在 base-ui 包目录下
cd packages/base-ui
pnpm build:watch
```

### 全量构建

提交代码前，执行全量构建确保所有包通过：

```bash
pnpm build
```

Turbo 会自动按依赖顺序构建所有包，并在有缓存时跳过未修改的包。

## 跨包依赖开发

当一个组件包依赖另一个组件包时（如 `base-form` 依赖 `base-ui`）：

### 开发时

dumi 通过 `.dumirc.ts` 中的 `alias` 配置，将所有包的导入重定向到各自的 `src` 源码目录。因此开发时无需预先构建依赖包：

```ts
// base-form 中的组件可以直接 import base-ui 的源码
import { Button } from '@regan-ad/base-ui'; // → 实际指向 packages/base-ui/src
```

### 构建时

各包的 `rollup.config.js` 中通过 `external` 将依赖包外部化，构建产物中不会包含依赖包的代码，而是保留 `import` 语句，由消费方自行安装：

```js
// packages/base-form/rollup.config.js
module.exports = createRollupConfig({
  input: 'src/index.tsx',
  external: ['react', 'react-dom', '@regan-ad/base-ui', '@regan-ad/shared'],
});
```

### 注意事项

- 各包的 `tsconfig.json` 不要配置 `paths` 指向其他包的 `src`，构建时应该引用 `dist` 产物
- `package.json` 的 `dependencies` 中使用 `workspace:*` 声明内部包依赖
- `peerDependencies` 声明 `react` 和 `react-dom`，避免重复安装

## 调试技巧

### 1. 使用 dumi 文档作为调试沙箱

在组件的 `index.md` 中编写 demo 时可以直接使用 React hooks，以下为示例代码：

```ts
import React, { useState } from 'react';
import { Input } from '@regan-ad/base-ui';

export default () => {
  const [value, setValue] = useState('');
  return (
    <>
      <Input value={value} onChange={setValue} placeholder="输入试试" />
      <p>当前值：{value}</p>
    </>
  );
};
```

### 2. 使用 Turbo 过滤调试

只构建修改的包及其依赖，加速调试：

```bash
# 只构建 base-ui 及其上游依赖
turbo build --filter=@regan-ad/base-ui

# 构建发生变更的包
turbo build --filter=...[HEAD^1]
```

### 3. 清理缓存

如果遇到构建异常，尝试清理缓存：

```bash
# 清理构建产物和 Turbo 缓存
pnpm clean

# 深度清理（含 node_modules）
pnpm clean:all && pnpm install
```

## 提交前检查清单

- [ ] 组件源码（`index.tsx`）类型定义完整，无 TypeScript 报错
- [ ] 组件文档（`index.md`）包含：基础用法 demo、API 表格
- [ ] 在 `src/index.ts` 中导出了新组件
- [ ] `pnpm build` 全量构建通过
- [ ] `pnpm docs:dev` 文档站点中组件页面正常展示
