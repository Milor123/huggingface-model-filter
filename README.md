# 🔍 HuggingFace Model Filter

[![GreasyFork](https://img.shields.io/badge/GreasyFork-Install-green?style=flat-square&logo=tampermonkey)](https://greasyfork.org/)
[![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)](LICENSE)
[![Version](https://img.shields.io/badge/Version-1.4-orange?style=flat-square)](https://github.com/Milor123/huggingface-model-filter)

> A powerful userscript to filter Hugging Face models by positive/negative keywords, featuring a floating draggable panel, multi-language support, and automatic infinite scroll detection. Built for ViolentMonkey / TamperMonkey / Greasemonkey.

---

## 📸 Preview

> Add your own screenshots here by replacing these placeholders.

![Floating panel](docs/images/panel-preview.png)
*Floating draggable filter panel — glassmorphism design with dark mode support*

![Filtered results](docs/images/results-preview.png)
*Green badge = positive match, red badge = negative match, dimmed = filtered out*

---

## ✨ Features

- ✅ **Positive keyword filtering** — Show only models matching your desired keywords
- ❌ **Negative keyword filtering** — Hide or dim models you don't want to see
- 🎨 **Modern floating UI** — Draggable, minimizable, glassmorphism, auto dark mode
- 🔄 **Infinite Scroll** — Automatically detects new models on scroll (SPA-aware)
- 💾 **Full persistence** — Keywords, options, and panel position saved to `localStorage`
- 🏷️ **Visual badges** — Color-coded indicators (green/red) on each model card
- ⚡ **Smart auto-filter** — Applies filters automatically as you type (~800ms debounce)
- 🌍 **Multi-language** — Native UI in English, Spanish, and Simplified Chinese (中文)
- 🌐 **Auto-translate (optional)** — Google Translate for 30+ additional languages, always explicitly opt-in by the user
- 📊 **Live stats counter** — Total / Visible / Filtered counts updated in real time

---

## 📦 Installation

### 1. Install a userscript manager

| Browser | Recommended extension |
|---------|----------------------|
| Chrome / Edge / Brave | [Violentmonkey](https://violentmonkey.github.io/get-it/) or [Tampermonkey](https://www.tampermonkey.net/) |
| Firefox | [Violentmonkey](https://addons.mozilla.org/firefox/addon/violentmonkey/) |
| Safari | [Userscripts](https://apps.apple.com/app/userscripts/id1463298887) (App Store) |

### 2. Install the script

<p align="center">
  <a href="https://github.com/Milor123/huggingface-model-filter/raw/refs/heads/main/huggingface-model-filter.user.js">
    <img src="https://img.shields.io/badge/Install%20Userscript-2ea44f?style=for-the-badge&logo=tampermonkey" alt="Install Userscript">
  </a>
</p>

**Option A — GreasyFork (recommended):**

> Add the direct GreasyFork link here when you publish it.

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
| Panel doesn't appear | Verify the URL matches `https://huggingface.co/models*` |
| Filters don't apply | Click **Apply Filters** or wait ~800ms after typing |
| ALL models are hidden | Check that your positive keywords aren't too restrictive. Reload the page |
| Panel blocks content | Drag it to another corner; position is saved automatically |
| Language doesn't change | Force reload with `Ctrl+Shift+R` to clear the userscript cache |
| Google Translate doesn't work | May be blocked by your region or adblocker. The UI still works in the native language |

---

## 📝 Changelog

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

## 🤝 Contributing

1. Fork the repository
2. Create a branch (`git checkout -b feature/my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin feature/my-new-feature`)
5. Open a Pull Request

### Ideas for future improvements

- [ ] Filter by parameter count (e.g. only 7B-13B)
- [ ] Filter by last update date
- [ ] Filter by number of likes / downloads
- [ ] Export / import configuration as JSON
- [ ] Keyboard shortcuts (e.g. `Ctrl+Shift+F` to focus the panel)
- [ ] Advanced regular expression support

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
