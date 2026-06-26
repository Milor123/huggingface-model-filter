# 🔍 HuggingFace Model Filter

<p align="center">
  <a href="https://github.com/Milor123/huggingface-model-filter/blob/main/README.md">🇬🇧 English</a> · 🇪🇸 Español · <a href="https://github.com/Milor123/huggingface-model-filter/blob/main/README_ZH.md">🇨🇳 中文</a>
</p>

[![GitHub](https://img.shields.io/badge/GitHub-Milor123/huggingface--model--filter-181717?style=flat-square&logo=github)](https://github.com/Milor123/huggingface-model-filter)
[![GreasyFork](https://img.shields.io/badge/GreasyFork-Instalar-green?style=flat-square&logo=tampermonkey)](https://greasyfork.org/es/scripts/583391-huggingface-model-filter)
[![License](https://img.shields.io/badge/Licencia-MIT-blue?style=flat-square)](LICENSE)
[![Versión](https://img.shields.io/badge/Versión-1.4-orange?style=flat-square)](https://github.com/Milor123/huggingface-model-filter)

> Un userscript potente para filtrar modelos de [Hugging Face](https://huggingface.co/models) por palabras clave positivas y negativas, con interfaz flotante, soporte multiidioma y detección automática de infinite scroll. Diseñado para ViolentMonkey / TamperMonkey / Greasemonkey.

---

## 📸 Vista Previa

![Panel flotante + resultados filtrados](https://github.com/user-attachments/assets/bdc8d4fb-09c8-45de-8cf5-81dc2bb02097)
*Panel de filtros flotante y arrastrable — glassmorphism con dark mode. Verde = match positivo, rojo = match negativo, difuminado = filtrado*

---

## ✨ Características

- ✅ **Filtrado positivo** — Mostrá únicamente los modelos que coincidan con tus keywords deseadas
- ❌ **Filtrado negativo** — Ocultá o difuminá modelos que no querés ver
- 🎨 **Interfaz flotante moderna** — Panel arrastrable, minimizable, glassmorphism, dark mode automático
- 🔄 **Infinite Scroll** — Detecta automáticamente nuevos modelos al hacer scroll (SPA-aware)
- 💾 **Persistencia total** — Keywords, opciones y posición del panel guardados en `localStorage`
- 🏷️ **Badges visuales** — Indicadores de color (verde/rojo) directamente sobre cada card del modelo
- ⚡ **Auto-filtro inteligente** — Aplica filtros con debounce automático mientras escribís (~800ms)
- 🌍 **Multiidioma** — Interfaz nativa en Español, Inglés y Chino (简体中文)
- 🌐 **Auto-traducción (opcional)** — Traducción vía Google Translate para +30 idiomas adicionales, siempre bajo demanda explícita del usuario
- 📊 **Contador en tiempo real** — Estadísticas de Total / Visibles / Filtrados actualizadas al instante

---

## 📦 Instalación

### 1. Instalá un gestor de userscripts

| Navegador | Extensión recomendada |
|-----------|----------------------|
| Chrome / Edge / Brave | [Violentmonkey](https://violentmonkey.github.io/get-it/) o [Tampermonkey](https://www.tampermonkey.net/) |
| Firefox | [Violentmonkey](https://addons.mozilla.org/firefox/addon/violentmonkey/) |
| Safari | [Userscripts](https://apps.apple.com/app/userscripts/id1463298887) (App Store) |

### 2. Instalá el script


**Opción A — GreasyFork (recomendado):**

<p align="center">
  <a href="https://github.com/Milor123/huggingface-model-filter/raw/refs/heads/main/huggingface-model-filter.user.js">
    <img src="https://img.shields.io/badge/Install%20Userscript-2ea44f?style=for-the-badge&logo=tampermonkey" alt="Install Userscript">
  </a>
</p>

**Opción B — Manual:**

1. Creá un nuevo script en tu gestor de userscripts
2. Copiá y pegá el contenido de `huggingface-model-filter.user.js`
3. Guardá (`Ctrl+S`)

### 3. Abrí Hugging Face

Visitá [https://huggingface.co/models](https://huggingface.co/models) y verás el panel flotante en la esquina superior izquierda.

---

## 🚀 Uso Rápido

### Ejemplos de filtros

| Keywords positivos | Keywords negativos | Resultado |
|--------------------|--------------------|-----------|
| `uncensored, qwen` | `beta, alpha` | Solo modelos Qwen sin censura, sin versiones inestables |
| `gguf, 7b, 8b` | `13b, 70b` | Modelos chicos en formato GGUF |
| `llama, instruct` | `deprecated` | Modelos LLaMA instructivos, activos |
| `claude, thinking` | `test, old` | Modelos Claude con thinking mode |
| `mistral, mixtral` | `sparse` | Modelos Mistral/Mixtral densos |

### Controles del panel

- **Arrastrar** — Agarrá la barra superior del panel y movelo a donde quieras
- **Minimizar** — Botón `−` para colapsar el panel a una barra compacta
- **Idioma** — Selector nativo: Inglés · Español · 中文 (cambia al instante)
- **Auto-traducir** — Checkbox opcional: elegí cualquier idioma de la lista y el panel se traduce automáticamente
- **Aplicar** — Ejecuta el filtrado manualmente
- **Limpiar** — Resetea palabras clave y muestra todos los modelos de nuevo

---

## ⚙️ Configuración

Toda la configuración se guarda automáticamente en `localStorage` bajo la clave `hf_model_filter_config`.

### Estructura del JSON

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

### Opciones explicadas

| Opción | Tipo | Descripción |
|--------|------|-------------|
| `positiveKeywords` | `string[]` | Solo se muestran modelos que contengan **al menos una** de estas palabras |
| `negativeKeywords` | `string[]` | Modelos con estas palabras se ocultan o difuminan |
| `hideOnNegative` | `boolean` | `true` = ocultar completamente; `false` = mostrar con badge rojo |
| `dimOnNegative` | `boolean` | `true` = difuminar al 15% en vez de ocultar |
| `highlightPositive` | `boolean` | `true` = borde verde y badge en los matches positivos |
| `caseSensitive` | `boolean` | Distingue entre mayúsculas y minúsculas |
| `matchFullWord` | `boolean` | Evita coincidencias parciales: "test" no matchea "testing" |
| `showStats` | `boolean` | `true` = muestra el contador de estadísticas |
| `autoFilter` | `boolean` | `true` = aplica filtros automáticamente al escribir |
| `locale` | `"en" \| "es" \| "zh"` | Idioma nativo de la interfaz |
| `autoTranslate` | `boolean` | `true` = activa la traducción automática vía Google |
| `autoTranslateLang` | `string` | Código ISO del idioma destino (ej: `fr`, `ja`, `de`) |
| `position` | `{x, y}` | Posición guardada del panel en píxeles |

---

## 🌍 Idiomas soportados

### Nativos (sin API, instantáneos)

| Código | Idioma |
|--------|--------|
| `en` | English |
| `es` | Español |
| `zh` | 中文 (简体) |

### Traducción automática via Google Translate (opcional)

El selector de auto-traducción incluye 30 idiomas: Inglés, Español, 中文, Français, Deutsch, Português, Italiano, 日本語, 한국어, Русский, العربية, हिन्दी, Nederlands, Polski, Türkçe, Tiếng Việt, ไทย, Svenska, Čeština, Ελληνικά, עברית, Українська, Română, Magyar, Dansk, Suomi, Norsk, Bahasa Indonesia, Bahasa Melayu, বাংলা.

> La traducción se cachea en `localStorage` (`hf_filter_trans_cache`) para evitar llamadas repetidas a la API.

---

## 🛠️ Desarrollo

### Estructura del proyecto

```
├── huggingface-model-filter.user.js  # Script principal (~1148 líneas, vanilla JS)
├── README_ES.md                     # Este archivo (documentación en español)
├── README.md                        # Documentación en inglés
├── README_ZH.md                     # 中文文档
└── LICENSE                          # MIT License
```

### Dependencias

- **Ninguna.** El script es 100% vanilla JavaScript.
- Usa `GM_addStyle` de Violentmonkey / Tampermonkey únicamente para el CSS inline.
- Sin dependencias externas, sin bundler, sin npm.

### Debugging

Para depurar el script en tu navegador:

1. Abrí la consola de desarrollador (`F12` → pestaña **Console**)
2. Buscá mensajes prefijados con `HF Filter:`
3. Podés inspeccionar `config` y `translationCache` escribiendo directamente en consola
4. Usá breakpoints en `applyFilter()` para inspeccionar el DOM de las cards

---

## 🐛 Solución de Problemas

| Problema | Solución |
|----------|----------|
| El panel no aparece | Verificá que la URL coincida con `https://huggingface.co/models*` |
| Los filtros no se aplican | Hacé clic en **Aplicar Filtros** o esperá ~800ms tras dejar de escribir |
| Se ocultan TODOS los modelos | Revisá que tus palabras positivas no sean demasiado restrictivas. Recargá la página |
| El panel tapa contenido | Arrastralo a otra esquina; la posición se guarda automáticamente |
| El idioma no cambia | Forzá el recargue con `Ctrl+Shift+R` para limpiar el cache del userscript |
| Google Translate no funciona | Puede estar bloqueado por tu región o adblocker. La interfaz sigue funcionando en el idioma nativo |

---

## 📝 Changelog

### v1.4 (2026-06-18)
- 📝 Actualización mayor de documentación (README en ES / EN / ZH)
- ✏️ Correcciones editoriales y estructura mejorada

### v1.3 (2026-06-18)
- 🌍 Internacionalización completa (i18n): interfaz en Inglés, Español y Chino
- 🌐 Auto-traducción via Google Translate para +30 idiomas (siempre opt-in)
- 🕹️ Selector manual de idioma + selector automático persistente
- 🗂️ Cache de traducciones en localStorage para carga instantánea en visitas repetidas

### v1.2 (2026-06-18)
- ✅ Corrección de sintaxis crítica (`config.negativeKeywords`)
- 🎨 Mejoras en el UI con glassmorphism y mejor contraste
- 🔄 Soporte para SPA navigation (detecta cambios de URL sin recarga completa)
- 📊 Contador de estadísticas en tiempo real (Total / Visibles / Filtrados)

### v1.1 (2026-06-18)
- ✨ Implementación de filtros positivos/negativos
- 🏷️ Badges visuales para matches positivos/negativos
- 💾 Persistencia de configuración en localStorage
- 🖱️ Panel arrastrable y minimizable

### v1.0 (2026-06-18)
- 🚀 Lanzamiento inicial

---

## 🤝 Contribuir

1. Hacé un fork del repositorio
2. Creá una rama (`git checkout -b feature/nueva-funcion`)
3. Hacé commit de tus cambios (`git commit -am 'Agrega nueva función'`)
4. Push a la rama (`git push origin feature/nueva-funcion`)
5. Abrí un Pull Request

### Ideas para futuras mejoras

- [ ] Filtro por número de parámetros (ej: solo 7B-13B)
- [ ] Filtro por fecha de última actualización
- [ ] Filtro por número de likes / descargas
- [ ] Exportar / importar configuración como JSON
- [ ] Atajos de teclado (ej: `Ctrl+Shift+F` para enfocar el panel)

---

## 🔬 Modo Avanzado: Expresiones Regulares (Regex)

> **Experimental**: Activa la casilla **"Modo Avanzado"** en el panel para usar Regex.

### Ejemplos prácticos

| Objetivo | Campo | Patrón | Descripción |
|----------|-------|--------|-------------|
| Solo modelos Llama | Positivo | `.*llama.*` | Muestra solo modelos con "llama" en el nombre |
| Excluir GGUF | Negativo | `.*gguf.*` | Oculta modelos cuantizados en GGUF |
| Empieza con "mistral" | Positivo | `^mistral` | Solo modelos cuyo nombre inicia con "mistral" |
| Excluir chat/instruct | Negativo | `.*(chat\|instruct)$` | Oculta modelos que terminan en "chat" o "instruct" |

### Soporte y limitaciones

✅ **Soportado**: `.*`, `^`, `$`, `[a-z]`, `(grupo)`, `\|` (operador O), insensible a mayúsculas/minúsculas.

❌ **No soportado**: Lookaheads/lookbehinds complejos (`(?=...)`, `(?<=...)`), modo multilínea.

⚠️ **Importante**: Un regex inválido (ej: paréntesis sin cerrar) no aplicará el filtro. Revisa la consola (F12) si algo no funciona.

---

## 📄 Licencia

Este proyecto está licenciado bajo la [MIT License](LICENSE).

---

<p align="center">
<sub>Hecho con ❤️ para la comunidad de IA open source</sub>
</p>
