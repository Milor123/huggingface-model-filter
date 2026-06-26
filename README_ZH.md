# 🔍 HuggingFace Model Filter — 中文文档

<p align="center">
  <a href="https://github.com/Milor123/huggingface-model-filter/blob/main/README.md">🇬🇧 English</a> · <a href="https://github.com/Milor123/huggingface-model-filter/blob/main/README_ES.md">🇪🇸 Español</a> · 🇨🇳 中文
</p>

[![GitHub](https://img.shields.io/badge/GitHub-Milor123/huggingface--model--filter-181717?style=flat-square&logo=github)](https://github.com/Milor123/huggingface-model-filter)
[![GreasyFork](https://img.shields.io/badge/GreasyFork-安装-green?style=flat-square&logo=tampermonkey)](https://greasyfork.org/es/scripts/583391-huggingface-model-filter)
[![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)](LICENSE)
[![Version](https://img.shields.io/badge/Version-1.4-orange?style=flat-square)](https://github.com/Milor123/huggingface-model-filter)

> 一个功能强大的用户脚本，通过正面/负面关键词过滤 [Hugging Face](https://huggingface.co/models)
> 模型。支持浮动拖拽面板、多语言界面和自动无限滚动检测。
> 适用于 ViolentMonkey / TamperMonkey / Greasemonkey。

---

## 📸 预览截图

![浮动面板 + 过滤结果](https://github.com/user-attachments/assets/bdc8d4fb-09c8-45de-8cf5-81dc2bb02097)
*可拖拽的浮动过滤面板 — 毛玻璃设计，支持暗色模式。绿色 badge = 正面匹配，红色 badge = 负面匹配，半透明 = 被过滤*

---

## ✨ 主要功能

- ✅ **正面关键词过滤** — 仅显示与你关键词相符的模型
- ❌ **负面关键词过滤** — 隐藏或淡化不想看到的模型
- 🎨 **现代浮动界面** — 可拖拽、可最小化、毛玻璃效果、自动暗色模式
- 🔄 **无限滚动** — 滚动时自动检测新加载的模型（兼容 SPA）
- 💾 **完整持久化** — 关键词、选项和面板位置保存在 `localStorage`
- 🏷️ **可视化徽章** — 每个模型卡片上的颜色标识（绿色/红色）
- ⚡ **智能自动过滤** — 输入时自动应用过滤器（~800ms 防抖）
- 🌍 **多语言支持** — 原生界面：English、Español、中文（简体）
- 🌐 **自动翻译（可选）** — 支持 30+ 种语言，通过 Google Translate 翻译，始终由用户主动开启
- 📊 **实时统计计数** — 即时更新总数 / 可见数 / 过滤数

---

## 📦 安装方法

### 1. 安装用户脚本管理器

| 浏览器 | 推荐扩展 |
|---------|---------|
| Chrome / Edge / Brave | [Violentmonkey](https://violentmonkey.github.io/get-it/) 或 [Tampermonkey](https://www.tampermonkey.net/) |
| Firefox | [Violentmonkey](https://addons.mozilla.org/firefox/addon/violentmonkey/) |
| Safari | [Userscripts](https://apps.apple.com/app/userscripts/id1463298887)（App Store） |

### 2. 安装脚本

**方式 A — GreasyFork（推荐）：**

<p align="center">
  <a href="https://github.com/Milor123/huggingface-model-filter/raw/refs/heads/main/huggingface-model-filter.user.js">
    <img src="https://img.shields.io/badge/Install%20Userscript-2ea44f?style=for-the-badge&logo=tampermonkey" alt="Install Userscript">
  </a>
</p>

**方式 B — 手动安装：**

1. 在脚本管理器中新建一个脚本
2. 复制并粘贴 `huggingface-model-filter.user.js` 的内容
3. 保存（`Ctrl+S`）

### 3. 打开 Hugging Face

访问 [https://huggingface.co/models](https://huggingface.co/models)，
浮动面板将出现在页面左上角。

---

## 🚀 快速入门

### 过滤示例

| 正面关键词 | 负面关键词 | 结果 |
|-----------|-----------|------|
| `uncensored, qwen` | `beta, alpha` | 仅显示无审查 Qwen 模型，排除不稳定版本 |
| `gguf, 7b, 8b` | `13b, 70b` | GGUF 格式的小参数模型 |
| `llama, instruct` | `deprecated` | 活跃的 LLaMA Instruct 模型 |
| `claude, thinking` | `test, old` | 带 thinking 模式的 Claude 模型 |
| `mistral, mixtral` | `sparse` | 仅显示稠密型 Mistral/Mixtral 模型 |

### 面板控制

- **拖拽** — 按住顶部栏将面板拖动到任意位置
- **最小化** — 点击 `−` 按钮折叠为紧凑条
- **语言** — 原生选择器：English · Español · 中文（即时切换）
- **自动翻译** — 可选复选框：从列表中选择任意语言，面板自动翻译
- **应用** — 手动执行过滤
- **重置** — 清除关键词并重新显示所有模型

---

## ⚙️ 配置说明

所有设置自动保存在浏览器 `localStorage` 中，键名为 `hf_model_filter_config`。

### JSON 结构

```json
{
  "positiveKeywords": ["uncensored", "qwen"],
  "negativeKeywords": ["beta", "deprecated"],
  "hideOnNegative": true,
  "dimOnNegative": false,
  "highlightPositive": true,
  "caseSensitive": false,
  "matchFullWord": false,
  "showStats": true,
  "autoFilter": true,
  "locale": "zh",
  "autoTranslate": false,
  "autoTranslateLang": "",
  "position": { "x": 20, "y": 100 }
}
```

### 选项详解

| 选项 | 类型 | 说明 |
|------|------|------|
| `positiveKeywords` | `string[]` | 仅显示包含**至少一个**这些词的模型 |
| `negativeKeywords` | `string[]` | 匹配这些词的模型将被隐藏或淡化 |
| `hideOnNegative` | `boolean` | `true` = 完全隐藏；`false` = 显示红色 badge |
| `dimOnNegative` | `boolean` | `true` = 淡化至 15% 而非完全隐藏 |
| `highlightPositive` | `boolean` | `true` = 匹配的正面模型显示绿色边框和 badge |
| `caseSensitive` | `boolean` | 区分大小写 |
| `matchFullWord` | `boolean` | 禁止部分匹配："test" 不会匹配 "testing" |
| `showStats` | `boolean` | `true` = 显示实时统计计数器 |
| `autoFilter` | `boolean` | `true` = 输入时自动应用过滤器 |
| `locale` | `"en" \| "es" \| "zh"` | 原生界面语言 |
| `autoTranslate` | `boolean` | `true` = 启用 Google 自动翻译 |
| `autoTranslateLang` | `string` | 目标语言 ISO 代码（如 `fr`、`ja`、`de`） |
| `position` | `{x, y}` | 面板保存位置（像素） |

---

## 🌍 支持的语言

### 原生语言（无需 API，即时切换）

| 代码 | 语言 |
|------|------|
| `en` | English |
| `es` | Español |
| `zh` | 中文（简体） |

### Google Translate 自动翻译（可选）

自动翻译下拉列表包含 30 种语言：English、Español、中文、Français、Deutsch、Português、
Italiano、日本語、한국어、Русский、العربية、हिन्दी、Nederlands、Polski、Türkçe、
Tiếng Việt、ไทย、Svenska、Čeština、Ελληνικά、עברית、Українська、Română、Magyar、
Dansk、Suomi、Norsk、Bahasa Indonesia、Bahasa Melayu、বাংলা。

> 翻译结果会缓存在 `localStorage`（`hf_filter_trans_cache`）中，避免重复调用 API。

---

## 🛠️ 开发说明

### 项目结构

```
├── huggingface-model-filter.user.js  # 主脚本（~1148 行，纯原生 JS）
├── README.md                        # English documentation
├── README_ES.md                     # Documentación en español
├── README_ZH.md                     # 本文档（中文）
└── LICENSE                          # MIT License
```

### 依赖

- **无。** 脚本 100% 纯原生 JavaScript。
- 仅使用 Violentmonkey / Tampermonkey 的 `GM_addStyle` 注入内联 CSS。
- 无外部依赖，无打包工具，无需 npm。

### 调试方法

在浏览器中调试此脚本：

1. 打开开发者工具（`F12` → **Console** 标签页）
2. 查找以 `HF Filter:` 开头的日志消息
3. 可直接在控制台中输入 `config` 和 `translationCache` 查看状态
4. 在 `applyFilter()` 函数中设置断点，检查模型卡片的 DOM 结构

---

## 🐛 常见问题

| 问题 | 解决方法 |
|------|----------|
| 面板未显示 | 确认 URL 匹配 `https://huggingface.co/models*` |
| 过滤器未生效 | 点击 **应用过滤器** 或停止输入约 800ms 后自动生效 |
| 所有模型都被隐藏 | 检查正面关键词是否过于严格，尝试刷新页面 |
| 面板遮挡内容 | 将其拖拽到其他角落，位置会自动保存 |
| 语言未切换 | 使用 `Ctrl+Shift+R` 强制刷新以清除用户脚本缓存 |
| Google 翻译无法使用 | 可能被所在地区或广告拦截器阻止。界面仍可在原生语言下正常使用 |

---

## 📝 更新日志

### v1.4（2026-06-18）
- 📝 文档大更新（新增 ES / EN / ZH 三版 README）
- ✏️ 编辑修正与结构优化

### v1.3（2026-06-18）
- 🌍 完整的国际化（i18n）支持：界面支持 English、Español、中文
- 🌐 Google Translate 自动翻译支持 30+ 种语言（始终 opt-in）
- 🕹️ 手动语言选择器 + 持久化自动翻译选择器
- 🗂️ 翻译缓存存入 localStorage，重复访问时即时加载

### v1.2（2026-06-18）
- ✅ 关键语法修复（`config.negativeKeywords`）
- 🎨 界面优化：毛玻璃效果与更好的对比度
- 🔄 SPA 导航支持（检测 URL 变化无需完全刷新）
- 📊 实时统计计数器（总数 / 可见数 / 过滤数）

### v1.1（2026-06-18）
- ✨ 正面/负面关键词过滤功能
- 🏷️ 匹配结果的视觉徽章
- 💾 localStorage 配置持久化
- 🖱️ 面板可拖拽与最小化

### v1.0（2026-06-18）
- 🚀 首次发布

---

## 🤝 参与贡献

1. Fork 本仓库
2. 创建分支（`git checkout -b feature/新功能`）
3. 提交更改（`git commit -am '添加新功能'`）
4. 推送到分支（`git push origin feature/新功能`）
5. 提交 Pull Request

### 未来改进计划

- [ ] 参数数量过滤（例如：仅 7B-13B）
- [ ] 最后更新日期过滤
- [ ] 点赞 / 下载量过滤
- [ ] 配置导出 / 导入为 JSON
- [ ] 键盘快捷键（例如：`Ctrl+Shift+F` 聚焦面板）

---

## 🚀 高级模式：正则表达式 (Regex)

此实验性功能允许使用**正则表达式**进行更强大的过滤。

### 如何启用
1. 在过滤面板中勾选 **"高级模式"** 复选框。
2. 将显示两个新输入框：**"正则包含"** 和 **"正则排除"**。

### 示例

| 目标 | 字段 | 模式 | 说明 |
| :--- | :--- | :--- | :--- |
| **仅 Llama 模型** | 正则包含 | `.*llama.*` | 匹配名称中含 "llama" 的模型。 |
| **排除 GGUF** | 正则排除 | `.*gguf.*` | 隐藏所有含 "gguf" 的模型。 |
| **以 Mistral 开头** | 正则包含 | `^mistral` | 仅匹配以 "mistral" 开头的名称。 |
| **排除 Chat/Instruct** | 正则排除 | `.*(chat\|instruct)$` | 隐藏以 "chat" 或 "instruct" 结尾的模型。 |

### ⚠️ 限制与须知
- **语法**: 使用标准 JavaScript RegExp 语法。支持 `.` `*` `^` `$` `[]` `()` `\|`。
- **大小写**: 默认**不区分**大小写（`Llama` 匹配 `llama`）。
- **性能**: 避免过于复杂的正则，以免拖慢页面。
- **错误**: 无效的正则表达式将被忽略（按 F12 查看控制台错误）。

---

## 📄 开源协议

本项目采用 [MIT License](LICENSE)。

---

🙏 **致谢**

- [Hugging Face](https://huggingface.co/) 提供了优秀的开源模型平台
- [Violentmonkey](https://violentmonkey.github.io/) 最佳用户脚本管理器
- GreasyFork 社区的反馈与建议

---

<p align="center">
<sub>为开源 AI 社区用心打造 ❤️</sub>
</p>
