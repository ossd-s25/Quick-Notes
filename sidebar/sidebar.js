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
