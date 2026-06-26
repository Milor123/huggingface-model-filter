# 🔍 HuggingFace Model Filter

<p align="center">
  🇬🇧 English · <a href="https://github.com/Milor123/huggingface-model-filter/blob/main/README_ES.md">🇪🇸 Español</a> · <a href="https://github.com/Milor123/huggingface-model-filter/blob/main/README_ZH.md">🇨🇳 中文</a>
</p>

[![GitHub](https://img.shields.io/badge/GitHub-Milor123/huggingface--model--filter-181717?style=flat-square&logo=github)](https://github.com/Milor123/huggingface-model-filter)
[![GreasyFork](https://img.shields.io/badge/GreasyFork-Install-green?style=flat-square&logo=tampermonkey)](https://greasyfork.org/es/scripts/583391-huggingface-model-filter)
[![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)](LICENSE)
[![Version](https://img.shields.io/badge/Version-1.5-orange?style=flat-square)](https://github.com/Milor123/huggingface-model-filter)

> A powerful userscript to filter Hugging Face models by positive/negative keywords, with Regex support, a floating draggable panel, multi-language interface, and automatic infinite scroll detection. Works on all model listing pages including user/organization profiles. Built for ViolentMonkey / TamperMonkey / Greasemonkey.

---

## 📸 Preview

![Floating panel + filtered results](https://github.com/user-attachments/assets/bdc8d4fb-09c8-45de-8cf5-81dc2bb02097)
*Floating draggable filter panel — glassmorphism design with dark mode support. Green badge = positive match, red badge = negative match, dimmed = filtered out*

---

## ✨ Features

- ✅ **Positive keyword filtering** — Show only models matching your desired keywords
- ❌ **Negative keyword filtering** — Hide or dim models you don't want to see
- 🎨 **Modern floating UI** — Draggable, minimizable, glassmorphism, auto dark mode
- 🔄 **Infinite Scroll** — Automatically detects new models on scroll (SPA-aware)
- 👥 **User/org pages** — Works on any Hugging Face model listing, including user and organization profiles
- 💾 **Full persistence** — Keywords, options, and panel position saved to `localStorage`
- 🏷️ **Visual badges** — Color-coded indicators (green/red) on each model card
- ⚡ **Smart auto-filter** — Applies filters automatically as you type (~800ms debounce)
- 🅰️ **Regex support** — Advanced search with regular expressions for pattern matching
- 🌍 **Multi-language** — Native UI in English, Spanish, and Simplified Chinese (中文)
- 🌐 **Auto-translate (optional)** — Google Translate for 30+ additional languages, always explicitly opt-in by the user
- 📊 **Live stats counter** — Total / Visible / Filtered counts updated in real time

---

## 🤝 Recommended Companion

I recommend using [**PageTual**](https://greasyfork.org/es/scripts/438684) alongside this script — it automatically loads the next page as you scroll, so you never have to click through pagination. Works seamlessly with HuggingFace Model Filter for an infinite-scroll browsing experience through your filtered results.

---

## 📦 Installation

### 1. Install a userscript manager

| Browser | Recommended extension |
|---------|----------------------|
| Chrome / Edge / Brave | [Violentmonkey](https://violentmonkey.github.io/get-it/) or [Tampermonkey](https://www.tampermonkey.net/) |
| Firefox | [Violentmonkey](https://addons.mozilla.org/firefox/addon/violentmonkey/) |
| Safari | [Userscripts](https://apps.apple.com/app/userscripts/id1463298887) (App Store) |

### 2. Install the script

**Option A — GreasyFork (recommended):**

<p align="center">
  <a href="https://github.com/Milor123/huggingface-model-filter/raw/refs/heads/main/huggingface-model-filter.user.js">
    <img src="https://img.shields.io/badge/Install%20Userscript-2ea44f?style=for-the-badge&logo=tampermonkey" alt="Install Userscript">
  </a>
</p>

**Option B — Manual:**

1. Create a new script in your userscript manager
2. Copy and paste the contents of `huggingface-model-filter.user.js`
3. Save (`Ctrl+S`)

### 3. Open Hugging Face

Visit [https://huggingface.co/models](https://huggingface.co/models) and the floating panel will appear in the top-left corner.

---

## 🚀 Quick Start

### Filter examples

| Positive keywords | Negative keywords | Result |
|-------------------|-------------------|--------|
| `uncensored, qwen` | `beta, alpha` | Only uncensored Qwen models, no unstable versions |
| `gguf, 7b, 8b` | `13b, 70b` | Small models in GGUF format |
| `llama, instruct` | `deprecated` | Active LLaMA instruct models |
| `claude, thinking` | `test, old` | Claude models with thinking mode |
| `mistral, mixtral` | `sparse` | Dense Mistral/Mixtral models only |

### Panel controls

- **Drag** — Grab the top bar to move the panel anywhere
- **Minimize** — `−` button to collapse to a compact bar
- **Language** — Native selector: English · Español · 中文 (instant switch)
- **Auto-translate** — Optional checkbox: pick any language from the list and the panel translates automatically
- **Apply** — Run filtering manually
- **Reset** — Clear keywords and show all models again

---

## 🅰️ Regex Mode

The filter supports **regular expressions (Regex)** for advanced pattern matching. Toggle between simple keyword mode and regex mode directly from the panel.

### How it works

- Enter **positive Regex patterns** to match models you want to see
- Enter **negative Regex patterns** to filter out unwanted models
- Separate multiple patterns with **commas** or **newlines**
- Case sensitivity and full-word matching settings also apply to Regex mode

### Preview

<img width="1462" height="921" alt="imagen" src="https://github.com/user-attachments/assets/fc4f7cc8-c8cb-43f9-b53c-c0e654a811b3" />


### Supported patterns

| Pattern | Description | Example |
|---------|-------------|---------|
| `keyword` | Simple match (same as keyword mode) | `llama` |
| `llama\|qwen` | OR — matches either term | `llama\|qwen` |
| `(?=.*qwen)(?=.*uncensored)` | Positive lookahead — match if ALL patterns present | `(?=.*qwen)(?=.*uncensored)` |
| `^(?!.*beta)` | Negative lookahead — exclude if pattern matches | `^(?!.*beta)` |
| `\b7b\b` | Word boundary — "7b" won't match "70b" | `\b7b\b` |
| `[0-9]+b` | Character classes and quantifiers | `7b\|13b\|70b` |

> **Note:** Patterns are matched against the model card text. Invalid Regex patterns are silently ignored and logged to the console (`HF Filter:` ) for debugging.

### Example Regex filters

| Positive Regex | Negative Regex | Result |
|----------------|----------------|--------|
| `(?=.*qwen)(?=.*uncensored)` | | Models containing BOTH "qwen" AND "uncensored" |
| `llama\|mistral` | `beta\|alpha` | LLaMA or Mistral models, no unstable versions |
| `\b7b\b` | `\b70b\b` | 7B models specifically, excluding 70B |

---

## ⚙️ Configuration

All settings are automatically saved to `localStorage` under the key `hf_model_filter_config`.

### JSON structure

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
  "locale": "en",
  "autoTranslate": false,
  "autoTranslateLang": "",
  "position": { "x": 20, "y": 100 }
}
```

### Options explained

| Option | Type | Description |
|--------|------|-------------|
| `positiveKeywords` | `string[]` | Only models containing **at least one** of these words are shown |
| `negativeKeywords` | `string[]` | Models matching these words are hidden or dimmed |
| `hideOnNegative` | `boolean` | `true` = hide completely; `false` = show with red badge |
| `dimOnNegative` | `boolean` | `true` = dim to 15% instead of hiding |
| `highlightPositive` | `boolean` | `true` = green border and badge on positive matches |
| `caseSensitive` | `boolean` | Distinguish between uppercase and lowercase |
| `matchFullWord` | `boolean` | Prevent partial matches: "test" won't match "testing" |
| `showStats` | `boolean` | `true` = show the live stats counter |
| `autoFilter` | `boolean` | `true` = apply filters automatically while typing |
| `locale` | `"en" \| "es" \| "zh"` | Native UI language |
| `autoTranslate` | `boolean` | `true` = enable auto-translation via Google |
| `autoTranslateLang` | `string` | ISO language code for the target language (e.g. `fr`, `ja`, `de`) |
| `position` | `{x, y}` | Saved panel position in pixels |

---

## 🌍 Supported languages

### Native (no API, instant)

| Code | Language |
|------|----------|
| `en` | English |
| `es` | Español |
| `zh` | 中文 (简体) |

### Auto-translate via Google Translate (optional)

The auto-translate selector includes 30 languages: English, Español, 中文, Français, Deutsch, Português, Italiano, 日本語, 한국어, Русский, العربية, हिन्दी, Nederlands, Polski, Türkçe, Tiếng Việt, ไทย, Svenska, Čeština, Ελληνικά, עברית, Українська, Română, Magyar, Dansk, Suomi, Norsk, Bahasa Indonesia, Bahasa Melayu, বাংলা.

> Translations are cached in `localStorage` (`hf_filter_trans_cache`) to avoid repeated API calls.

---

## 🛠️ Development

### Project structure

```
├── huggingface-model-filter.user.js  # Main script (~1148 lines, vanilla JS)
├── README.md                        # This file (English documentation)
├── README_ES.md                     # Documentación en español
├── README_ZH.md                     # 中文文档
└── LICENSE                          # MIT License
```

### Dependencies

- **None.** The script is 100% vanilla JavaScript.
- Uses `GM_addStyle` from Violentmonkey / Tampermonkey only for inline CSS.
- No external dependencies, no bundler, no npm required.

### Debugging

To debug the script in your browser:

1. Open the developer console (`F12` → **Console** tab)
2. Look for messages prefixed with `HF Filter:`
3. Inspect `config` and `translationCache` directly from the console
4. Set breakpoints inside `applyFilter()` to inspect the model cards DOM

---

## 🐛 Troubleshooting

| Problem | Solution |
|---------|----------|
| Panel doesn't appear | Make sure you're on a Hugging Face model listing page (e.g. `huggingface.co/models` or `huggingface.co/:user/models`) |
| Filters don't apply | Click **Apply Filters** or wait ~800ms after typing |
| ALL models are hidden | Check that your positive keywords aren't too restrictive. Reload the page |
| Panel blocks content | Drag it to another corner; position is saved automatically |
| Language doesn't change | Force reload with `Ctrl+Shift+R` to clear the userscript cache |
| Google Translate doesn't work | May be blocked by your region or adblocker. The UI still works in the native language |

---

## 📝 Changelog

### v1.5 (2026-06-26)
- ✨ Regular expression (Regex) support for advanced search with pattern matching
- 👥 Support for user and organization model pages (`huggingface.co/:user/models`)
- 🧹 Removed outdated "Ideas for future improvements" section

### v1.4 (2026-06-18)
- 📝 Major documentation update (README in ES / EN / ZH)
- ✏️ Editorial fixes and improved structure

### v1.3 (2026-06-18)
- 🌍 Full internationalization (i18n): UI in English, Spanish, and Chinese
- 🌐 Auto-translation via Google Translate for 30+ languages (always opt-in)
- 🕹️ Manual language selector + persistent auto-translate selector
- 🗂️ Translation cache in localStorage for instant loading on repeat visits

### v1.2 (2026-06-18)
- ✅ Critical syntax fix (`config.negativeKeywords`)
- 🎨 UI improvements with glassmorphism and better contrast
- 🔄 SPA navigation support (detects URL changes without full reload)
- 📊 Real-time stats counter (Total / Visible / Filtered)

### v1.1 (2026-06-18)
- ✨ Positive/negative keyword filtering
- 🏷️ Visual badges for positive/negative matches
- 💾 Configuration persistence in localStorage
- 🖱️ Draggable and minimizable panel

### v1.0 (2026-06-18)
- 🚀 Initial release

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

🙏 **Acknowledgments**

- [Hugging Face](https://huggingface.co/) for their amazing open-source model platform
- [Violentmonkey](https://violentmonkey.github.io/) for the best userscript manager
- The GreasyFork community for feedback and ideas

---

<p align="center">
<sub>Made with ❤️ for the open-source AI community</sub>
</p>
