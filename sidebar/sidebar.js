// ====== 自动补全映射定义 ======

// 特殊环境触发词映射（包括带星号、可选项的情况）
const specialEnvTriggers = {
    "balis": { env: "align", star: true },
    "bali": { env: "align", star: false },
    "baliat": { env: "alignat", star: false },
    "baliats": { env: "alignat", star: true },
    "balied": { env: "aligned", star: false },
    "baliedat": { env: "alignedat", option: true },
  };
  
  // 泛用环境列表（用于 b+三个字母的匹配）
  const environments = [
    "document", "abstract", "align", "tabular", "appendix",
    "bmatrix", "pmatrix", "cases", "description", "center",
    "equation", "enumerate", "eqnarray", "figure", "flalign",
    "gather", "itemize", "letter", "list", "minipage", "multiline",
    "picture", "split", "subequations", "theorem", "titlepage",
    "trivlist", "varwidth", "verbatim", "theindex", "thebibliography"
  ];
  
  // 字体命令映射（示例）
  const fontMapping = {
    "tbf": "\\textbf{}",
    "ttf": "\\texttt{}",
    "tsf": "\\textsf{}",
    "tsc": "\\textsc{}",
    "tsl": "\\textsl{}",
    "tit": "\\textit{}",
    "tem": "\\emph{}"
  };
  
  // 章节命令映射
  const sectionMapping = {
    "cha": "\\chapter{}",
    "sec": "\\section{}",
    "ssec": "\\subsection{}",
    "sssec": "\\subsubsection{}"
  };
  
  // 希腊字母映射（示例）
  const greekMapping = {
    "alpha": "\\alpha",
    "beta": "\\beta",
    "chi": "\\chi",
    "delta": "\\delta",
    "gamma": "\\gamma",
    "iota": "\\iota",
    "mu": "\\mu",
    "lamb": "\\lambda",
    "Lambda": "\\Lambda",
    "nu": "\\nu",
    "omega": "\\omega",
    "Omega": "\\Omega",
    "pi": "\\pi",
    "sigma": "\\sigma",
    "zeta": "\\zeta",
    "rho": "\\rho",
    "tau": "\\tau",
    "ups": "\\upsilon",
    "xi": "\\xi",
    "Xi": "\\Xi",
    // 特殊：epsilon 和 varepsilon
    "xe": "\\epsilon",
    "xve": "\\varepsilon",
    "et": "\\eta",
    "xp": "\\phi",       // 对应 \phi
    "xvp": "\\varphi",   // 对应 \varphi
    "xph": "\\phi",
    "xcph": "\\Phi",
    "xps": "\\psi",
    "xcps": "\\Psi",
    "xth": "\\theta"
  };
  
  // 杂项与普通命令映射
  const miscMapping = {
    "usep": "\\usepackage{}",
    "foot": "\\footnote{}",
    "frac": "\\frac{}{}",
    "fbox": "\\fbox{}",
    "fboxo": "\\framebox{}",
    "href": "\\href{}{}",
    "incg": "\\includegraphics{}",
    "incgo": "\\includegraphics[]{}",
    "ncol": "&",
    "newc": "\\newcommand{}{}",
    "newe": "\\newenvironment{}{}{}",
    "newpg": "\\newpage",
    "pgref": "\\pageref{}",
    "pgs": "\\pagestyle{}",
    "sqrt": "\\sqrt{}",
    "toc": "\\tableofcontents",
    "listf": "\\listoffigures",
    "list": "\\listoftables",
    "multic": "\\multicolumn{}{}{}"
  };
  
  // ====== 自动补全核心函数 ======
  
  // 根据触发词返回补全内容
  function getCompletionForToken(token) {
    // 检查特殊环境
    if (specialEnvTriggers[token]) {
      const info = specialEnvTriggers[token];
      let envName = info.env + (info.star ? "*" : "");
      let optionStr = info.option ? "[...]" : "";
      return `\\begin{${envName}}${optionStr}\n\t\n\\end{${envName}}`;
    }
    // 泛用环境补全：匹配模式 "b+三个字母"（可带 s 或 o 后缀）
    const envPattern = /^b([a-z]{3})(s?)(o?)$/;
    const envMatch = token.match(envPattern);
    if (envMatch) {
      const base = envMatch[1];
      const star = envMatch[2];
      const opt = envMatch[3];
      for (let env of environments) {
        let cmp = env.startsWith("the") ? env.slice(3) : env;
        if (cmp.startsWith(base)) {
          let envName = env + (star ? "*" : "");
          let optionStr = opt ? "[...]" : "";
          return `\\begin{${envName}}${optionStr}\n\t\\item \n\\end{${envName}}`;
        }
      }
    }
    // 检查字体命令
    if (fontMapping[token]) { return fontMapping[token]; }
    // 检查章节命令
    if (sectionMapping[token]) { return sectionMapping[token]; }
    // 检查希腊字母：要求触发词以 "x" 开头
    if (token.startsWith("x")) {
      const key = token.slice(1);
      if (greekMapping[key]) { return greekMapping[key]; }
    }
    // 检查杂项命令
    if (miscMapping[token]) { return miscMapping[token]; }
    return null;
  }
  
  // 将补全文本插入到光标位置，并删除触发词（tokenLength 表示触发词的长度）
  function insertAtCaret(textarea, replacement, tokenLength) {
    const pos = textarea.selectionStart;
    const text = textarea.value;
    const before = text.substring(0, pos - tokenLength);
    const after = text.substring(pos);
    textarea.value = before + replacement + after;
    // 这里简单将光标定位到补全文本的末尾，你可以进一步优化为定位到大括号内部
    const newPos = before.length + replacement.length;
    textarea.selectionStart = textarea.selectionEnd = newPos;
  }
  
  // 尝试自动补全：如果当前光标前存在有效触发词，则进行补全
  function tryAutoComplete(textarea) {
    const pos = textarea.selectionStart;
    const text = textarea.value.substring(0, pos);
    const match = text.match(/(\S+)$/);
    if (match) {
      const token = match[1];
      const replacement = getCompletionForToken(token);
      if (replacement) {
        insertAtCaret(textarea, replacement, token.length);
        hideSuggestionBox();
        return true;
      }
    }
    return false;
  }
  
  // ====== 候选建议框相关 ======
  
  // 动态创建一个建议框（你也可以直接在 HTML 中定义）
  const suggestionBox = document.createElement("div");
  suggestionBox.id = "suggestionBox";
  suggestionBox.style.position = "absolute";
  suggestionBox.style.backgroundColor = "#fff";
  suggestionBox.style.border = "1px solid #ccc";
  suggestionBox.style.zIndex = "1000";
  suggestionBox.style.display = "none";
  document.body.appendChild(suggestionBox);
  
  // 根据当前输入的 token 获取候选项（整合所有映射）
  function getSuggestions(token) {
    let candidates = [];
    // 特殊环境候选
    for (let key in specialEnvTriggers) {
      if (key.startsWith(token)) { candidates.push(key); }
    }
    // 泛用环境候选：当 token 以 "b" 开头且长度不超过 5 时
    if (token.startsWith("b") && token.length <= 5) {
      const base = token.slice(1);
      environments.forEach(env => {
        let cmp = env.startsWith("the") ? env.slice(3) : env;
        if (cmp.startsWith(base)) {
          const trigger = "b" + cmp.slice(0, 3);
          candidates.push(trigger);
        }
      });
    }
    // 字体命令候选
    for (let key in fontMapping) {
      if (key.startsWith(token)) { candidates.push(key); }
    }
    // 章节命令候选
    for (let key in sectionMapping) {
      if (key.startsWith(token)) { candidates.push(key); }
    }
    // 希腊字母候选：要求 token 以 "x" 开头
    if (token.startsWith("x")) {
      Object.keys(greekMapping).forEach(key => {
        if (key.startsWith(token.slice(1))) { candidates.push("x" + key); }
      });
    }
    // 杂项命令候选
    for (let key in miscMapping) {
      if (key.startsWith(token)) { candidates.push(key); }
    }
    // 去除重复项
    return [...new Set(candidates)];
  }
  
  // 根据当前输入更新建议框的内容和位置
  function updateSuggestionBox(textarea) {
    const pos = textarea.selectionStart;
    const textBefore = textarea.value.substring(0, pos);
    const tokenMatch = textBefore.match(/(\S+)$/);
    if (!tokenMatch) {
      hideSuggestionBox();
      return;
    }
    const token = tokenMatch[1];
    const suggestions = getSuggestions(token);
    if (suggestions.length === 0) {
      hideSuggestionBox();
      return;
    }
    suggestionBox.innerHTML = suggestions
      .map(item => `<div class="suggestion-item" style="padding: 4px 8px; cursor: pointer;">${item}</div>`)
      .join("");
    suggestionBox.style.display = "block";
    // 将建议框放置在文本框下方
    const rect = textarea.getBoundingClientRect();
    suggestionBox.style.left = rect.left + "px";
    suggestionBox.style.top = (rect.bottom + window.scrollY) + "px";
  }
  
  // 隐藏建议框
  function hideSuggestionBox() {
    suggestionBox.style.display = "none";
  }
  
  // 当点击建议项时自动补全
  suggestionBox.addEventListener("click", (event) => {
    if (event.target.classList.contains("suggestion-item")) {
      const token = event.target.innerText;
      const textarea = document.getElementById("noteArea");
      const pos = textarea.selectionStart;
      const text = textarea.value.substring(0, pos);
      const match = text.match(/(\S+)$/);
      if (match) {
        const curToken = match[1];
        const replacement = getCompletionForToken(token);
        if (replacement) {
          insertAtCaret(textarea, replacement, curToken.length);
        }
      }
    }
  });
  
  // ====== 事件监听 ======
  document.addEventListener("DOMContentLoaded", () => {
    const noteArea = document.getElementById("noteArea");
  
    // 拦截 Tab 键：阻止焦点跳转，尝试自动补全或插入制表符
    noteArea.addEventListener("keydown", (event) => {
      if (event.key === "Tab") {
        event.preventDefault();
        if (!tryAutoComplete(noteArea)) {
          // 如果没有合适的补全项，则插入一个 Tab 字符
          insertAtCaret(noteArea, "\t", 0);
          hideSuggestionBox();
        }
      }
    });
  
    // 每次输入时更新候选建议框
    noteArea.addEventListener("input", () => {
      updateSuggestionBox(noteArea);
    });
  
    // 失去焦点时延迟隐藏建议框，方便点击选择
    noteArea.addEventListener("blur", () => {
      setTimeout(hideSuggestionBox, 200);
    });
  });
  
document.addEventListener("DOMContentLoaded", async () => {
    const noteArea = document.getElementById("noteArea");
    const saveButton = document.getElementById("saveNote");
    const preview = document.getElementById("preview");
    const sourceBtn = document.getElementById("sourceBtn");
    const previewBtn = document.getElementById("previewBtn");

    // 用于保存内容的历史栈
    const historyStack = [];
    let isCtrlPressed = false;

    // marked settings
    marked.setOptions({
        gfm: true, // GitHub-flavored Markdown
        breaks: true,
        smartypants: false,
    });

    // 保存当前内容到历史栈
    const saveToHistory = (content) => {
        if (historyStack.length === 0 || historyStack[historyStack.length - 1] !== content) {
            historyStack.push(content);
        }
    };

    // 初始化历史栈
    saveToHistory(noteArea.value);

    // 监听键盘事件以捕获 Ctrl+Z
    document.addEventListener("keydown", (event) => {
        if (event.ctrlKey && event.key === "z") {
            if (historyStack.length > 1) {
                historyStack.pop(); // 移除当前内容
                const previousContent = historyStack[historyStack.length - 1]; // 获取上一步内容
                noteArea.value = previousContent; // 恢复到上一步
            } else {
                alert("No more steps to undo!");
            }
            event.preventDefault(); // 阻止默认行为
        }
    });

    // 在文本框输入时保存历史记录
    noteArea.addEventListener("input", () => {
        saveToHistory(noteArea.value);
    });

    // Load Notes
    const fileInput = document.getElementById("fileInput");
    fileInput.addEventListener("change", (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                noteArea.value = e.target.result;
                saveToHistory(noteArea.value); // 保存加载后的内容到历史
                alert("File loaded successfully!");
            };
            reader.onerror = () => {
                alert("Failed to read the file.");
            };
            reader.readAsText(file);
        }
    });

    // Save Notes
    saveButton.addEventListener("click", async () => {
        const noteContent = noteArea.value.trim();
        if (!noteContent) {
            alert("Note is empty. Nothing to save.");
            return;
        }

        const blob = new Blob([noteContent], { type: "text/markdown" });
        const url = URL.createObjectURL(blob);
        const fileName = "my-quick-note.md";

        try {
            let downloadId = await browser.downloads.download({
                url: url,
                filename: fileName,
                saveAs: true,
            });

            console.log(`Download started: ${downloadId}`);
            alert("Note saved successfully!");
        } catch (error) {
            console.error("Download failed:", error);
            alert("Failed to save the note.");
        } finally {
            setTimeout(() => {
                URL.revokeObjectURL(url);
            }, 1000);
        }
    });

    // Toggle to Source mode
    sourceBtn.addEventListener("click", () => {
        noteArea.style.display = "block";
        preview.style.display = "none";
    });

    // Toggle to Preview mode
    previewBtn.addEventListener("click", () => {
        try {
            preview.innerHTML = marked.parse(noteArea.value);
            MathJax.typesetPromise([preview]).catch((err) =>
                console.error("MathJax typeset failed: ", err)
            );
            noteArea.style.display = "none";
            preview.style.display = "block";
        } catch (err) {
            alert("Failed to parse Markdown content.");
            console.error("Markdown parse failed: ", err);
        }
    });
});

