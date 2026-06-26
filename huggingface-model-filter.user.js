// ==UserScript==
// @name          HuggingFace Model Filter
// @name:es       Filtro de Modelos de HuggingFace
// @name:zh-CN    HuggingFace 模型过滤器
// @namespace     https://github.com/Milor123/huggingface-model-filter
// @version       1.4
// @description   Filter HuggingFace models by positive/negative keywords with a floating, draggable, persistent UI. Supports infinite scroll, dark mode, auto-filter, multi-language (EN/ES/ZH + 30 Google Translate), and localStorage persistence.
// @description:es Filtra modelos de HuggingFace por palabras clave positivas/negativas con una interfaz flotante, arrastrable y persistente. Soporta scroll infinito, modo oscuro, auto-filtro, multi-idioma (EN/ES/ZH + 30 idiomas con Google Translate) y persistencia en localStorage.
// @description:zh-CN 通过正面/负面关键词筛选 HuggingFace 模型，带有浮动、可拖拽、持久化的界面。支持无限滚动、暗黑模式、自动筛选、多语言（英语/西班牙语/中文 + 30 种 Google 翻译语言）和 localStorage 持久化。
// @author        Mateo Bohorquez (Milor123)
// @match        https://huggingface.co/models*
// @match        https://huggingface.co/models?*
// @match        https://huggingface.co/*/models*
// @match        https://huggingface.co/*/models?*
// @grant        GM_addStyle
// @run-at       document-end
// @license      MIT
// @homepageURL  https://github.com/Milor123/huggingface-model-filter
// @supportURL   https://github.com/Milor123/huggingface-model-filter/issues
// @downloadURL  https://github.com/Milor123/huggingface-model-filter/raw/refs/heads/main/huggingface-model-filter.user.js
// @updateURL    https://github.com/Milor123/huggingface-model-filter/raw/refs/heads/main/huggingface-model-filter.user.js
// @icon         https://huggingface.co/favicon.ico
// ==/UserScript==

/*
 * HuggingFace Model Filter v1.4
 * https://github.com/Milor123/huggingface-model-filter
 *
 * Filter HuggingFace models by positive/negative keywords. Includes a draggable
 * floating panel with infinite scroll, dark mode, and persistent settings.
 * Supports English, Chinese, Spanish, and opt-in auto-translate via Google.
 *
 * License: MIT
 */

(function() {
    'use strict';

    // ==========================================
    // I18N - Translations
    // ==========================================
    const LOCALES = {
        en: {
            panelTitle: '🔍 HF Model Filter',
            minimizeTitle: 'Minimize',
            positiveLabel: '✅ Positive keywords (show only these)',
            positivePlaceholder: 'uncensored, qwen, llama, 7b, gguf...',
            positiveHint: 'Comma-separated. Only models matching at least one are shown',
            negativeLabel: '❌ Negative keywords (hide)',
            negativePlaceholder: 'beta, deprecated, old, test...',
            negativeHint: 'Comma-separated. Matching models are hidden/dimmed',
            hideNegative: 'Completely hide negative matches',
            dimNegative: 'Only dim negatives (show faintly)',
            highlightPositive: 'Highlight positive matches',
            caseSensitive: 'Case sensitive',
            matchFullWord: 'Match whole word only',
            advancedMode: 'Advanced Mode (Regex)',
            positiveRegexLabel: 'Positive Regex Patterns',
            positiveRegexPlaceholder: 'pattern1, pattern2...',
            positiveRegexHint: 'Regex patterns to match (one per line or comma-separated)',
            negativeRegexLabel: 'Negative Regex Patterns',
            negativeRegexPlaceholder: 'pattern1, pattern2...',
            negativeRegexHint: 'Regex patterns to exclude (one per line or comma-separated)',
            total: 'Total',
            visible: 'Visible',
            filtered: 'Filtered',
            applyBtn: 'Apply Filters',
            applyDone: '✓ Applied!',
            resetBtn: 'Reset',
            tipsTitle: '💡 Tips:',
            tips: [
                'Use "gguf, qwen" to find Qwen models in GGUF format',
                'Filter "uncensored" to see uncensored models only',
                'Exclude "beta, alpha" to avoid unstable versions',
            ],
            badgeMatch: '✓ Match',
            badgeBlocked: '✗ Blocked',
            langLabel: '🌐 Language',
            langEn: 'English',
            langZh: '中文',
            langEs: 'Español',
            autoTranslateLabel: 'Auto-translate (Google)',
            autoTranslateNote: 'Choose a language below to translate the UI via Google.',
            translating: 'Translating...',
            translateFailed: 'Auto-translate unavailable',
            selectLang: 'Select language',
        },
        zh: {
            panelTitle: '🔍 HF 模型筛选',
            minimizeTitle: '最小化',
            positiveLabel: '✅ 正向关键词（仅显示这些）',
            positivePlaceholder: 'uncensored, qwen, llama, 7b, gguf...',
            positiveHint: '用逗号分隔。仅显示匹配至少一个关键词的模型',
            negativeLabel: '❌ 负向关键词（隐藏）',
            negativePlaceholder: 'beta, deprecated, old, test...',
            negativeHint: '用逗号分隔。匹配的模型将被隐藏或变暗',
            hideNegative: '完全隐藏负向匹配',
            dimNegative: '仅变暗显示负向匹配',
            highlightPositive: '高亮显示正向匹配',
            caseSensitive: '区分大小写',
            matchFullWord: '匹配完整单词',
            advancedMode: '高级模式（正则表达式）',
            positiveRegexLabel: '正向正则表达式模式',
            positiveRegexPlaceholder: '模式 1, 模式 2...',
            positiveRegexHint: '用于匹配的正则表达式模式（每行一个或用逗号分隔）',
            negativeRegexLabel: '负向正则表达式模式',
            negativeRegexPlaceholder: '模式 1, 模式 2...',
            negativeRegexHint: '用于排除的正则表达式模式（每行一个或用逗号分隔）',
            total: '总计',
            visible: '可见',
            filtered: '已过滤',
            applyBtn: '应用筛选',
            applyDone: '✓ 已应用！',
            resetBtn: '重置',
            tipsTitle: '💡 提示：',
            tips: [
                '使用"gguf, qwen"查找 GGUF 格式的 Qwen 模型',
                '筛选"uncensored"仅查看无审查模型',
                '排除"beta, alpha"以避免不稳定版本',
            ],
            badgeMatch: '✓ 匹配',
            badgeBlocked: '✗ 已屏蔽',
            langLabel: '🌐 语言',
            langEn: 'English',
            langZh: '中文',
            langEs: 'Español',
            autoTranslateLabel: '自动翻译（谷歌）',
            autoTranslateNote: '在下方选择语言以通过谷歌翻译界面。',
            translating: '翻译中...',
            translateFailed: '自动翻译不可用',
            selectLang: '选择语言',
        },
        es: {
            panelTitle: '🔍 HF Model Filter',
            minimizeTitle: 'Minimizar',
            positiveLabel: '✅ Palabras positivas (mostrar solo estos)',
            positivePlaceholder: 'uncensored, qwen, llama, 7b, gguf...',
            positiveHint: 'Separados por comas. Solo se muestran modelos que coincidan',
            negativeLabel: '❌ Palabras negativas (ocultar)',
            negativePlaceholder: 'beta, deprecated, old, test...',
            negativeHint: 'Separados por comas. Se ocultan/difuminan modelos que coincidan',
            hideNegative: 'Ocultar completamente los negativos',
            dimNegative: 'Solo difuminar negativos (ver transparencia)',
            highlightPositive: 'Resaltar coincidencias positivas',
            caseSensitive: 'Distinguir mayúsculas/minúsculas',
            matchFullWord: 'Coincidir palabra completa',
            advancedMode: 'Modo Avanzado (Regex)',
            positiveRegexLabel: 'Patrones Regex Positivos',
            positiveRegexPlaceholder: 'patrón1, patrón2...',
            positiveRegexHint: 'Patrones regex para mostrar (uno por línea o separado por comas)',
            negativeRegexLabel: 'Patrones Regex Negativos',
            negativeRegexPlaceholder: 'patrón1, patrón2...',
            negativeRegexHint: 'Patrones regex para excluir (uno por línea o separado por comas)',
            total: 'Total',
            visible: 'Visibles',
            filtered: 'Filtrados',
            applyBtn: 'Aplicar Filtros',
            applyDone: '✓ Aplicado!',
            resetBtn: 'Limpiar',
            tipsTitle: '💡 Tips:',
            tips: [
                'Usa "gguf, qwen" para encontrar modelos Qwen en formato GGUF',
                'Filtra "uncensored" para ver solo modelos sin censura',
                'Excluye "beta, alpha" para evitar versiones inestables',
            ],
            badgeMatch: '✓ Match',
            badgeBlocked: '✗ Blocked',
            langLabel: '🌐 Idioma',
            langEn: 'English',
            langZh: '中文',
            langEs: 'Español',
            autoTranslateLabel: 'Traducción automática (Google)',
            autoTranslateNote: 'Elegí un idioma abajo para traducir la interfaz vía Google.',
            translating: 'Traduciendo...',
            translateFailed: 'Traducción automática no disponible',
            selectLang: 'Seleccionar idioma',
        }
    };

    const AVAILABLE_LANGS = [
        { code: 'en', name: 'English' },
        { code: 'es', name: 'Español' },
        { code: 'zh', name: '中文' },
        { code: 'fr', name: 'Français' },
        { code: 'de', name: 'Deutsch' },
        { code: 'pt', name: 'Português' },
        { code: 'it', name: 'Italiano' },
        { code: 'ja', name: '日本語' },
        { code: 'ko', name: '한국어' },
        { code: 'ru', name: 'Русский' },
        { code: 'ar', name: 'العربية' },
        { code: 'hi', name: 'हिन्दी' },
        { code: 'nl', name: 'Nederlands' },
        { code: 'pl', name: 'Polski' },
        { code: 'tr', name: 'Türkçe' },
        { code: 'vi', name: 'Tiếng Việt' },
        { code: 'th', name: 'ไทย' },
        { code: 'sv', name: 'Svenska' },
        { code: 'cs', name: 'Čeština' },
        { code: 'el', name: 'Ελληνικά' },
        { code: 'he', name: 'עברית' },
        { code: 'uk', name: 'Українська' },
        { code: 'ro', name: 'Română' },
        { code: 'hu', name: 'Magyar' },
        { code: 'da', name: 'Dansk' },
        { code: 'fi', name: 'Suomi' },
        { code: 'no', name: 'Norsk' },
        { code: 'id', name: 'Bahasa Indonesia' },
        { code: 'ms', name: 'Bahasa Melayu' },
        { code: 'bn', name: 'বাংলা' },
    ];

    function getBrowserLang() {
        const lang = (navigator.language || navigator.userLanguage || '').toLowerCase();
        if (lang.startsWith('zh')) return 'zh';
        if (lang.startsWith('es')) return 'es';
        return 'en';
    }

    function getBrowserLangCode() {
        return (navigator.language || navigator.userLanguage || 'en').toLowerCase().split('-')[0];
    }

    function getLangName(code) {
        try {
            return new Intl.DisplayNames([code], { type: 'language' }).of(code) || code;
        } catch(e) {
            return code;
        }
    }

    // ==========================================
    // CONFIGURACIÓN PERSISTENTE
    // ==========================================
    const STORAGE_KEY = 'hf_model_filter_config';
    const CACHE_KEY = 'hf_filter_trans_cache';

    const defaultConfig = {
        positiveKeywords: [],
        negativeKeywords: [],
        positiveRegexPatterns: [],
        negativeRegexPatterns: [],
        advancedModeEnabled: false,
        hideOnNegative: true,
        dimOnNegative: false,
        highlightPositive: true,
        caseSensitive: false,
        matchFullWord: false,
        showStats: true,
        autoFilter: true,
        position: { x: 20, y: 100 },
        locale: getBrowserLang(),
        autoTranslate: false,
        autoTranslateLang: '',
    };

    let config = { ...defaultConfig };
    let filteredCount = 0;
    let totalCount = 0;
    let translationCache = {};
    let isTranslating = false;

    // ==========================================
    // UTILIDADES
    // ==========================================
    function t(key) {
        if (config.autoTranslate && config.autoTranslateLang && !['en', 'zh', 'es'].includes(config.autoTranslateLang)) {
            const cacheKey = key + '__' + config.autoTranslateLang;
            if (translationCache[cacheKey] !== undefined) {
                return translationCache[cacheKey];
            }
        }
        const locale = LOCALES[config.locale] || LOCALES.en;
        return locale[key] !== undefined ? locale[key] : LOCALES.en[key];
    }

    function loadConfig() {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) config = { ...defaultConfig, ...JSON.parse(saved) };
        } catch(e) { console.log('HF Filter: No config found'); }
    }

    function saveConfig() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
    }

    function loadTranslationCache() {
        try {
            const saved = localStorage.getItem(CACHE_KEY);
            if (saved) translationCache = JSON.parse(saved);
        } catch(e) {}
    }

    function saveTranslationCache() {
        try {
            localStorage.setItem(CACHE_KEY, JSON.stringify(translationCache));
        } catch(e) {}
    }

    // ==========================================
    // AUTO-TRANSLATE (Google Translate, no key)
    // ==========================================
    async function googleTranslate(text, targetLang) {
        const url = 'https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=' + encodeURIComponent(targetLang) + '&dt=t';
        const body = new URLSearchParams({ q: text });
        const res = await fetch(url, { method: 'POST', body });
        const data = await res.json();
        return data[0].map(s => s[0]).join('');
    }

    async function doAutoTranslate() {
        const target = config.autoTranslateLang;
        if (!target) return;
        const supported = ['en', 'zh', 'es'];

        if (supported.includes(target)) {
            config.locale = target;
            saveConfig();
            rebuildUI();
            return;
        }

        const sampleKey = Object.keys(LOCALES.en)[0] + '__' + target;
        if (translationCache[sampleKey] !== undefined) {
            rebuildUI();
            return;
        }

        isTranslating = true;
        rebuildUI();

        const sep = '\n@@@SEP@@@\n';
        const arrSep = '\n@@@ARR@@@\n';
        const keys = Object.keys(LOCALES.en);
        const combined = keys.map(k => {
            const v = LOCALES.en[k];
            return Array.isArray(v) ? v.join(arrSep) : v;
        }).join(sep);


        try {
            const translated = await googleTranslate(combined, target);
            const parts = translated.split(sep);
            keys.forEach((key, i) => {
                if (parts[i] === undefined) return;
                const orig = LOCALES.en[key];
                let val = parts[i];
                if (Array.isArray(orig)) {
                    val = val.split(arrSep);
                }
                translationCache[key + '__' + target] = val;
            });
            saveTranslationCache();
        } catch(e) {
            console.log('HF Filter: Auto-translate failed', e);
        }

        isTranslating = false;
        rebuildUI();
    }

    function normalizeText(text) {
        if (!text) return '';
        return config.caseSensitive ? text : text.toLowerCase();
    }

    function matchesKeyword(text, keyword) {
        if (!text || !keyword) return false;
        const t = normalizeText(text);
        const k = normalizeText(keyword.trim());
        if (!k) return false;

        if (config.matchFullWord) {
            const regex = new RegExp(`\\b${k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, config.caseSensitive ? '' : 'i');
            return regex.test(text);
        }
        return t.includes(k);
    }

    function matchesRegexPattern(text, pattern) {
        if (!text || !pattern) return false;
        try {
            const flags = config.caseSensitive ? '' : 'i';
            const regex = new RegExp(pattern.trim(), flags);
            return regex.test(text);
        } catch(e) {
            console.log('HF Filter: Invalid regex pattern:', pattern, e);
            return false;
        }
    }

    // ==========================================
    // LÓGICA DE FILTRADO
    // ==========================================
    function getModelCards() {
        return document.querySelectorAll('article.overview-card-wrapper, [class*="overview-card"], article[class*="group/repo"]');
    }

    function analyzeModel(card) {
        const titleEl = card.querySelector('h4, h3, [class*="truncate"], header h4');
        const title = titleEl ? titleEl.textContent : '';
        const fullText = card.textContent || '';
        const metaText = Array.from(card.querySelectorAll('span, div[class*="text-gray"]'))
            .map(el => el.textContent)
            .join(' ');

        return {
            title: title.trim(),
            fullText: fullText.trim(),
            metaText: metaText.trim(),
            element: card
        };
    }

    function checkKeywords(text) {
        let pos = false;
        let neg = false;

        // Check regular keywords
        if (config.positiveKeywords.filter(k => k.trim()).length > 0) {
            pos = config.positiveKeywords.filter(k => k.trim()).some(k => matchesKeyword(text, k));
        }
        if (config.negativeKeywords.filter(k => k.trim()).length > 0) {
            neg = config.negativeKeywords.filter(k => k.trim()).some(k => matchesKeyword(text, k));
        }

        // Check regex patterns if advanced mode is enabled
        if (config.advancedModeEnabled) {
            if (config.positiveRegexPatterns.filter(p => p.trim()).length > 0) {
                const posRegex = config.positiveRegexPatterns.filter(p => p.trim()).some(p => matchesRegexPattern(text, p));
                pos = pos || posRegex;
            }
            if (config.negativeRegexPatterns.filter(p => p.trim()).length > 0) {
                const negRegex = config.negativeRegexPatterns.filter(p => p.trim()).some(p => matchesRegexPattern(text, p));
                neg = neg || negRegex;
            }
        }

        return { positive: pos, negative: neg };
    }

    function applyFilter() {
        const cards = getModelCards();
        totalCount = cards.length;
        filteredCount = 0;

        cards.forEach(card => {
            const model = analyzeModel(card);
            const checks = checkKeywords(model.fullText);

            card.style.display = '';
            card.style.opacity = '1';
            card.style.filter = 'none';
            card.style.transform = 'scale(1)';
            card.style.transition = 'all 0.3s ease';
            card.style.border = 'none';
            card.style.boxShadow = '';
            card.style.position = 'relative';

            const oldBadge = card.querySelector('.hf-filter-badge');
            if (oldBadge) oldBadge.remove();

            let action = 'show';

            if (checks.negative && config.hideOnNegative) {
                action = 'hide';
            } else if (checks.negative && config.dimOnNegative) {
                action = 'dim';
            } else if (checks.positive && config.highlightPositive) {
                action = 'highlight';
            } else if (config.positiveKeywords.length > 0 && !checks.positive) {
                action = 'dim';
            }

            switch(action) {
                case 'hide':
                    card.style.display = 'none';
                    filteredCount++;
                    break;
                case 'dim':
                    card.style.opacity = '0.15';
                    card.style.filter = 'grayscale(100%) blur(1px)';
                    break;
                case 'highlight':
                    card.style.border = '2px solid #10b981';
                    card.style.boxShadow = '0 0 15px rgba(16, 185, 129, 0.3)';
                    card.style.transform = 'scale(1.02)';
                    card.style.zIndex = '10';
                    addBadge(card, t('badgeMatch'), '#10b981');
                    break;
            }

            if (checks.negative && action !== 'hide') {
                addBadge(card, t('badgeBlocked'), '#ef4444');
            }
        });

        updateStats();
    }

    function addBadge(card, text, color) {
        const badge = document.createElement('div');
        badge.className = 'hf-filter-badge';
        badge.textContent = text;
        badge.style.cssText = `
            position: absolute;
            top: 8px;
            right: 8px;
            background: ${color};
            color: white;
            padding: 2px 8px;
            border-radius: 12px;
            font-size: 10px;
            font-weight: bold;
            z-index: 100;
            pointer-events: none;
            font-family: system-ui, -apple-system, sans-serif;
        `;
        card.style.position = 'relative';
        card.appendChild(badge);
    }

    function updateStats() {
        const statsEl = document.getElementById('hf-filter-stats');
        if (!statsEl || !config.showStats) return;

        const visible = totalCount - filteredCount;
        statsEl.innerHTML = `
            <span style="color: #6b7280;">${t('total')}: ${totalCount}</span>
            <span style="color: #10b981; margin-left: 8px;">${t('visible')}: ${visible}</span>
            <span style="color: #ef4444; margin-left: 8px;">${t('filtered')}: ${filteredCount}</span>
        `;
    }

    // ==========================================
    // INTERFAZ DE USUARIO
    // ==========================================
    function createUI() {
        const oldUI = document.getElementById('hf-filter-panel');
        if (oldUI) oldUI.remove();

        const tipsHtml = t('tips').map(tip => `<li>${tip}</li>`).join('');

        const localeOptions = ['en', 'zh', 'es'].map(code =>
            `<option value="${code}" ${config.locale === code ? 'selected' : ''}>${t('lang' + code.charAt(0).toUpperCase() + code.slice(1))}</option>`
        ).join('');

        const langOptions = `<option value="">— ${t('selectLang')} —</option>`
            + AVAILABLE_LANGS.map(l =>
                `<option value="${l.code}" ${config.autoTranslateLang === l.code ? 'selected' : ''}>${l.name}</option>`
            ).join('');

        const panel = document.createElement('div');
        panel.id = 'hf-filter-panel';
        panel.innerHTML = `
            <div id="hf-filter-header">
                <span>${t('panelTitle')}</span>
                <button id="hf-filter-toggle" title="${t('minimizeTitle')}">−</button>
            </div>
            <div id="hf-filter-body">
                <div class="hf-lang-selector">
                    <label class="hf-label">${t('langLabel')}</label>
                    <select id="hf-lang" ${config.autoTranslate ? 'disabled' : ''}>${localeOptions}</select>
                </div>

                <div class="hf-section">
                    <label class="hf-label">${t('positiveLabel')}</label>
                    <textarea id="hf-positive" placeholder="${t('positivePlaceholder')}">${config.positiveKeywords.join(', ')}</textarea>
                    <div class="hf-hint">${t('positiveHint')}</div>
                </div>

                <div class="hf-section">
                    <label class="hf-label">${t('negativeLabel')}</label>
                    <textarea id="hf-negative" placeholder="${t('negativePlaceholder')}">${config.negativeKeywords.join(', ')}</textarea>
                    <div class="hf-hint">${t('negativeHint')}</div>
                </div>

                <div class="hf-options">
                    <label class="hf-checkbox">
                        <input type="checkbox" id="hf-hide-negative" ${config.hideOnNegative ? 'checked' : ''}>
                        <span>${t('hideNegative')}</span>
                    </label>
                    <label class="hf-checkbox">
                        <input type="checkbox" id="hf-dim-negative" ${config.dimOnNegative ? 'checked' : ''}>
                        <span>${t('dimNegative')}</span>
                    </label>
                    <label class="hf-checkbox">
                        <input type="checkbox" id="hf-highlight" ${config.highlightPositive ? 'checked' : ''}>
                        <span>${t('highlightPositive')}</span>
                    </label>
                    <label class="hf-checkbox">
                        <input type="checkbox" id="hf-case" ${config.caseSensitive ? 'checked' : ''}>
                        <span>${t('caseSensitive')}</span>
                    </label>
                    <label class="hf-checkbox">
                        <input type="checkbox" id="hf-word" ${config.matchFullWord ? 'checked' : ''}>
                        <span>${t('matchFullWord')}</span>
                    </label>
                    <hr class="hf-options-divider">
                    <label class="hf-checkbox">
                        <input type="checkbox" id="hf-advanced-mode" ${config.advancedModeEnabled ? 'checked' : ''}>
                        <span>${t('advancedMode')}</span>
                    </label>
                    <div id="hf-advanced-wrap" style="${config.advancedModeEnabled ? '' : 'display: none;'}">
                        <div class="hf-section" style="margin-top: 12px;">
                            <label class="hf-label">${t('positiveRegexLabel')}</label>
                            <textarea id="hf-positive-regex" placeholder="${t('positiveRegexPlaceholder')}" rows="3">${config.positiveRegexPatterns.join(', ')}</textarea>
                            <div class="hf-hint">${t('positiveRegexHint')}</div>
                        </div>
                        <div class="hf-section">
                            <label class="hf-label">${t('negativeRegexLabel')}</label>
                            <textarea id="hf-negative-regex" placeholder="${t('negativeRegexPlaceholder')}" rows="3">${config.negativeRegexPatterns.join(', ')}</textarea>
                            <div class="hf-hint">${t('negativeRegexHint')}</div>
                        </div>
                    </div>
                    <hr class="hf-options-divider">
                    <label class="hf-checkbox">
                        <input type="checkbox" id="hf-auto-translate" ${config.autoTranslate ? 'checked' : ''}>
                        <span>${t('autoTranslateLabel')}</span>
                    </label>
                    <div id="hf-auto-lang-wrap" style="padding-left: 24px; ${config.autoTranslate ? '' : 'display: none;'}">
                        <select id="hf-auto-lang" class="hf-auto-lang-select">${langOptions}</select>
                        <span id="hf-auto-trans-status" style="display: ${isTranslating ? 'inline' : 'none'}; color: #6b7280; font-size: 12px; margin-left: 8px;">⏳ ${t('translating')}</span>
                    </div>
                    <div class="hf-hint" style="padding-left: 24px;">${t('autoTranslateNote')}</div>
                </div>

                <div id="hf-filter-stats"></div>

                <div class="hf-buttons">
                    <button id="hf-apply" class="hf-btn hf-btn-primary">${t('applyBtn')}</button>
                    <button id="hf-reset" class="hf-btn hf-btn-secondary">${t('resetBtn')}</button>
                </div>

                <div class="hf-tips">
                    <strong>${t('tipsTitle')}</strong>
                    <ul>${tipsHtml}</ul>
                </div>
            </div>
        `;

        document.body.appendChild(panel);
        applyStyles();
        attachEvents();
        makeDraggable(panel);
        updateStats();
    }

    function applyStyles() {
        GM_addStyle(`
            #hf-filter-panel {
                position: fixed;
                top: ${config.position.y}px;
                left: ${config.position.x}px;
                width: 320px;
                background: rgba(255, 255, 255, 0.95);
                backdrop-filter: blur(12px);
                border: 1px solid rgba(0,0,0,0.08);
                border-radius: 16px;
                box-shadow: 0 20px 60px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.05);
                z-index: 999999;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                font-size: 13px;
                color: #1f2937;
                overflow: hidden;
                transition: opacity 0.3s, transform 0.3s;
            }

            #hf-filter-panel.minimized {
                width: auto;
                min-width: 180px;
            }

            #hf-filter-panel.minimized #hf-filter-body {
                display: none;
            }

            #hf-filter-header {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 12px 16px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                cursor: move;
                user-select: none;
                font-weight: 600;
                font-size: 14px;
            }

            #hf-filter-toggle {
                background: rgba(255,255,255,0.2);
                border: none;
                color: white;
                width: 24px;
                height: 24px;
                border-radius: 6px;
                cursor: pointer;
                font-size: 16px;
                line-height: 1;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: background 0.2s;
            }

            #hf-filter-toggle:hover {
                background: rgba(255,255,255,0.3);
            }

            #hf-filter-body {
                padding: 16px;
                max-height: 70vh;
                overflow-y: auto;
            }

            .hf-lang-selector {
                margin-bottom: 16px;
            }

            .hf-lang-selector select {
                width: 100%;
                padding: 8px 10px;
                border: 1px solid #e5e7eb;
                border-radius: 8px;
                font-size: 13px;
                font-family: inherit;
                background: #fafafa;
                cursor: pointer;
                transition: border-color 0.2s, box-shadow 0.2s;
                box-sizing: border-box;
            }

            .hf-lang-selector select:focus {
                outline: none;
                border-color: #667eea;
                box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
            }

            .hf-lang-selector select:disabled {
                opacity: 0.5;
                cursor: not-allowed;
            }

            .hf-trans-status {
                display: block;
                font-size: 11px;
                margin-top: 4px;
            }

            .hf-trans-loading {
                color: #f59e0b;
            }

            .hf-trans-active {
                color: #10b981;
            }

            .hf-auto-lang-select {
                width: 100%;
                padding: 6px 8px;
                border: 1px solid #d1d5db;
                border-radius: 8px;
                font-size: 12px;
                background: white;
                color: #1f2937;
                margin-top: 6px;
                cursor: pointer;
            }

            .hf-auto-lang-select:focus {
                outline: none;
                border-color: #667eea;
                box-shadow: 0 0 0 2px rgba(102, 126, 234, 0.2);
            }

            .hf-section {
                margin-bottom: 16px;
            }

            .hf-label {
                display: block;
                font-weight: 600;
                margin-bottom: 6px;
                color: #374151;
                font-size: 12px;
                text-transform: uppercase;
                letter-spacing: 0.3px;
            }

            .hf-section textarea {
                width: 100%;
                min-height: 60px;
                padding: 10px;
                border: 1px solid #e5e7eb;
                border-radius: 8px;
                font-size: 13px;
                resize: vertical;
                font-family: inherit;
                background: #fafafa;
                transition: border-color 0.2s, box-shadow 0.2s;
                box-sizing: border-box;
            }

            .hf-section textarea:focus {
                outline: none;
                border-color: #667eea;
                box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
                background: white;
            }

            .hf-hint {
                font-size: 11px;
                color: #9ca3af;
                margin-top: 4px;
            }

            .hf-options-divider {
                border: none;
                border-top: 1px solid #e5e7eb;
                margin: 8px 0;
            }

            .hf-options {
                display: flex;
                flex-direction: column;
                gap: 8px;
                margin-bottom: 16px;
                padding: 12px;
                background: #f9fafb;
                border-radius: 8px;
            }

            .hf-checkbox {
                display: flex;
                align-items: center;
                gap: 8px;
                cursor: pointer;
                font-size: 12px;
                color: #4b5563;
            }

            .hf-checkbox input[type="checkbox"] {
                width: 16px;
                height: 16px;
                accent-color: #667eea;
                cursor: pointer;
            }

            #hf-filter-stats {
                text-align: center;
                padding: 8px;
                background: #f3f4f6;
                border-radius: 8px;
                margin-bottom: 12px;
                font-size: 12px;
                font-weight: 500;
            }

            .hf-buttons {
                display: flex;
                gap: 8px;
                margin-bottom: 12px;
            }

            .hf-btn {
                flex: 1;
                padding: 10px 16px;
                border: none;
                border-radius: 8px;
                font-size: 13px;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.2s;
                font-family: inherit;
            }

            .hf-btn-primary {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
            }

            .hf-btn-primary:hover {
                transform: translateY(-1px);
                box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
            }

            .hf-btn-secondary {
                background: #e5e7eb;
                color: #374151;
            }

            .hf-btn-secondary:hover {
                background: #d1d5db;
            }

            .hf-tips {
                font-size: 11px;
                color: #6b7280;
                background: #fef3c7;
                padding: 10px;
                border-radius: 8px;
                border-left: 3px solid #f59e0b;
            }

            .hf-tips strong {
                color: #92400e;
            }

            .hf-tips ul {
                margin: 4px 0 0 16px;
                padding: 0;
            }

            .hf-tips li {
                margin-bottom: 2px;
            }

            #hf-filter-body::-webkit-scrollbar {
                width: 6px;
            }

            #hf-filter-body::-webkit-scrollbar-track {
                background: transparent;
            }

            #hf-filter-body::-webkit-scrollbar-thumb {
                background: #d1d5db;
                border-radius: 3px;
            }

            @media (prefers-color-scheme: dark) {
                #hf-filter-panel {
                    background: rgba(17, 24, 39, 0.95);
                    color: #f3f4f6;
                    border-color: rgba(255,255,255,0.1);
                }

                .hf-section textarea {
                    background: #1f2937;
                    border-color: #374151;
                    color: #f3f4f6;
                }

                .hf-section textarea:focus {
                    background: #111827;
                }

                .hf-label {
                    color: #d1d5db;
                }

                .hf-lang-selector select {
                    background: #1f2937;
                    border-color: #374151;
                    color: #f3f4f6;
                }

                .hf-lang-selector select:focus {
                    background: #111827;
                }

                .hf-options {
                    background: #1f2937;
                }

                .hf-options-divider {
                    border-color: #374151;
                }

                .hf-checkbox {
                    color: #d1d5db;
                }

                #hf-filter-stats {
                    background: #1f2937;
                    color: #d1d5db;
                }

                .hf-btn-secondary {
                    background: #374151;
                    color: #f3f4f6;
                }

                .hf-btn-secondary:hover {
                    background: #4b5563;
                }

                .hf-tips {
                    background: rgba(245, 158, 11, 0.15);
                    color: #e5e7eb;
                }

                .hf-tips strong {
                    color: #fbbf24;
                }

                .hf-auto-lang-select {
                    background: #1f2937;
                    color: #f3f4f6;
                    border-color: #374151;
                }

                .hf-auto-lang-select:focus {
                    border-color: #667eea;
                    box-shadow: 0 0 0 2px rgba(102, 126, 234, 0.3);
                }
            }
        `);
    }

    function rebuildUI() {
        createUI();
    }

    function attachEvents() {
        const panel = document.getElementById('hf-filter-panel');

        document.getElementById('hf-filter-toggle').addEventListener('click', () => {
            panel.classList.toggle('minimized');
            const btn = document.getElementById('hf-filter-toggle');
            btn.textContent = panel.classList.contains('minimized') ? '+' : '−';
        });

        document.getElementById('hf-lang').addEventListener('change', (e) => {
            config.locale = e.target.value;
            saveConfig();
            rebuildUI();
        });

        document.getElementById('hf-auto-translate').addEventListener('change', (e) => {
            if (e.target.checked) {
                config.autoTranslate = true;
                if (!config.autoTranslateLang) {
                    config.autoTranslateLang = getBrowserLangCode();
                }
                saveConfig();
                rebuildUI();
                if (config.autoTranslateLang) {
                    doAutoTranslate();
                }
            } else {
                config.autoTranslate = false;
                saveConfig();
                rebuildUI();
            }
        });

        document.getElementById('hf-auto-lang').addEventListener('change', (e) => {
            config.autoTranslateLang = e.target.value;
            saveConfig();
            if (e.target.value) {
                isTranslating = false;
                doAutoTranslate();
            }
        });

        document.getElementById('hf-apply').addEventListener('click', () => {
            const posText = document.getElementById('hf-positive').value;
            const negText = document.getElementById('hf-negative').value;
            const posRegexText = document.getElementById('hf-positive-regex') ? document.getElementById('hf-positive-regex').value : '';
            const negRegexText = document.getElementById('hf-negative-regex') ? document.getElementById('hf-negative-regex').value : '';

            config.positiveKeywords = posText.split(',').map(s => s.trim()).filter(Boolean);
            config.negativeKeywords = negText.split(',').map(s => s.trim()).filter(Boolean);
            config.positiveRegexPatterns = posRegexText.split(/[,\n]/).map(s => s.trim()).filter(Boolean);
            config.negativeRegexPatterns = negRegexText.split(/[,\n]/).map(s => s.trim()).filter(Boolean);
            config.advancedModeEnabled = document.getElementById('hf-advanced-mode') ? document.getElementById('hf-advanced-mode').checked : false;
            config.hideOnNegative = document.getElementById('hf-hide-negative').checked;
            config.dimOnNegative = document.getElementById('hf-dim-negative').checked;
            config.highlightPositive = document.getElementById('hf-highlight').checked;
            config.caseSensitive = document.getElementById('hf-case').checked;
            config.matchFullWord = document.getElementById('hf-word').checked;

            saveConfig();
            applyFilter();

            const btn = document.getElementById('hf-apply');
            const originalText = btn.textContent;
            btn.textContent = t('applyDone');
            btn.style.background = '#10b981';
            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.background = '';
            }, 1500);
        });

        document.getElementById('hf-reset').addEventListener('click', () => {
            document.getElementById('hf-positive').value = '';
            document.getElementById('hf-negative').value = '';
            if (document.getElementById('hf-positive-regex')) {
                document.getElementById('hf-positive-regex').value = '';
                document.getElementById('hf-negative-regex').value = '';
            }
            document.getElementById('hf-hide-negative').checked = true;
            document.getElementById('hf-dim-negative').checked = false;
            document.getElementById('hf-highlight').checked = true;
            document.getElementById('hf-case').checked = false;
            document.getElementById('hf-word').checked = false;
            if (document.getElementById('hf-advanced-mode')) {
                document.getElementById('hf-advanced-mode').checked = false;
            }

            config = { ...defaultConfig, locale: config.locale, autoTranslate: config.autoTranslate, autoTranslateLang: config.autoTranslateLang };
            saveConfig();
            applyFilter();

            const cards = getModelCards();
            cards.forEach(card => {
                card.style.display = '';
                card.style.opacity = '1';
                card.style.filter = 'none';
                card.style.transform = 'scale(1)';
                card.style.border = 'none';
                card.style.boxShadow = '';
                const badge = card.querySelector('.hf-filter-badge');
                if (badge) badge.remove();
            });
            updateStats();
        });

        let debounceTimer;
        ['hf-positive', 'hf-negative'].forEach(id => {
            document.getElementById(id).addEventListener('input', () => {
                if (!config.autoFilter) return;
                clearTimeout(debounceTimer);
                debounceTimer = setTimeout(() => {
                    document.getElementById('hf-apply').click();
                }, 800);
            });
        });

        // Add auto-filter for regex fields if advanced mode is enabled
        ['hf-positive-regex', 'hf-negative-regex'].forEach(id => {
            const el = document.getElementById(id);
            if (el) {
                el.addEventListener('input', () => {
                    if (!config.autoFilter || !config.advancedModeEnabled) return;
                    clearTimeout(debounceTimer);
                    debounceTimer = setTimeout(() => {
                        document.getElementById('hf-apply').click();
                    }, 800);
                });
            }
        });

        document.querySelectorAll('.hf-options input[type="checkbox"]').forEach(cb => {
            if (cb.id === 'hf-auto-translate') return;
            cb.addEventListener('change', () => {
                // Toggle advanced mode section visibility
                if (cb.id === 'hf-advanced-mode') {
                    const advancedWrap = document.getElementById('hf-advanced-wrap');
                    if (advancedWrap) {
                        advancedWrap.style.display = cb.checked ? '' : 'none';
                    }
                }
                document.getElementById('hf-apply').click();
            });
        });
    }

    function makeDraggable(element) {
        const header = element.querySelector('#hf-filter-header');
        let isDragging = false;
        let startX, startY, startLeft, startTop;

        header.addEventListener('mousedown', (e) => {
            isDragging = true;
            startX = e.clientX;
            startY = e.clientY;
            const rect = element.getBoundingClientRect();
            startLeft = rect.left;
            startTop = rect.top;
            element.style.transition = 'none';
            header.style.cursor = 'grabbing';
        });

        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            const dx = e.clientX - startX;
            const dy = e.clientY - startY;
            element.style.left = `${startLeft + dx}px`;
            element.style.top = `${startTop + dy}px`;
            element.style.right = 'auto';
            element.style.bottom = 'auto';
        });

        document.addEventListener('mouseup', () => {
            if (isDragging) {
                isDragging = false;
                header.style.cursor = 'move';
                element.style.transition = 'opacity 0.3s, transform 0.3s';
                const rect = element.getBoundingClientRect();
                config.position = { x: rect.left, y: rect.top };
                saveConfig();
            }
        });
    }

    // ==========================================
    // OBSERVADOR PARA INFINITE SCROLL
    // ==========================================
    function setupObserver() {
        const observer = new MutationObserver((mutations) => {
            let shouldFilter = false;
            mutations.forEach(mutation => {
                mutation.addedNodes.forEach(node => {
                    if (node.nodeType === 1 && (
                        node.matches?.('article.overview-card-wrapper') ||
                        node.querySelector?.('article.overview-card-wrapper')
                    )) {
                        shouldFilter = true;
                    }
                });
            });
            if (shouldFilter) {
                setTimeout(applyFilter, 100);
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    // ==========================================
    // INICIALIZACIÓN
    // ==========================================
    function init() {
        loadConfig();
        loadTranslationCache();
        createUI();
        setupObserver();

        if (config.positiveKeywords.length > 0 || config.negativeKeywords.length > 0) {
            setTimeout(applyFilter, 500);
        }

        if (config.autoTranslate) {
            doAutoTranslate();
        }

        let lastUrl = location.href;
        new MutationObserver(() => {
            if (location.href !== lastUrl) {
                lastUrl = location.href;
                setTimeout(() => {
                    applyFilter();
                }, 1000);
            }
        }).observe(document, { subtree: true, childList: true });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    setTimeout(init, 2000);
})();