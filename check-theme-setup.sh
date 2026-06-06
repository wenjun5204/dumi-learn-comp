#!/bin/bash
# Dumi 自定义主题配置检查清单

echo "🔍 Dumi 自定义主题配置检查"
echo "================================"
echo ""

# 检查文件是否存在
echo "📁 检查文件结构..."

files=(
  ".dumi/theme/layouts/DocLayout.tsx"
  ".dumi/theme/layouts/GlobalLayout.tsx"
  ".dumi/theme/styles/toc.css"
  ".dumi/theme/README.md"
  "docs/.dumirc.ts"
)

for file in "${files[@]}"; do
  if [ -f "$file" ]; then
    echo "✅ $file"
  else
    echo "❌ $file (缺失)"
  fi
done

echo ""
echo "🔧 配置检查..."
echo ""

# 检查 docs/.dumirc.ts 中是否有 theme 配置
if grep -q "theme:" docs/.dumirc.ts; then
  echo "✅ docs/.dumirc.ts 中找到 theme 配置"
else
  echo "❌ docs/.dumirc.ts 中缺少 theme 配置"
fi

# 检查 DocLayout 中是否使用了 useRouteMeta
if grep -q "useRouteMeta" .dumi/theme/layouts/DocLayout.tsx; then
  echo "✅ DocLayout 使用了 useRouteMeta"
else
  echo "❌ DocLayout 未找到 useRouteMeta"
fi

# 检查 DocLayout 中是否有 TOC 渲染逻辑
if grep -q "toc.map" .dumi/theme/layouts/DocLayout.tsx; then
  echo "✅ DocLayout 包含 TOC 渲染逻辑"
else
  echo "❌ DocLayout 缺少 TOC 渲染逻辑"
fi

echo ""
echo "✨ 所有检查完成！"
echo ""
echo "🚀 后续步骤："
echo "1. 运行: pnpm docs:dev"
echo "2. 访问: http://localhost:8000"
echo "3. 检查文档页面的右侧是否显示 TOC 导航"
echo ""
