// import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";

document.addEventListener("DOMContentLoaded", async () => {
    const noteArea = document.getElementById("noteArea");
    const saveButton = document.getElementById("saveNote");
    const preview = document.getElementById("preview");
    const sourceBtn = document.getElementById("sourceBtn");
    const previewBtn = document.getElementById("previewBtn");

    // marked settings
    marked.setOptions({
        gfm: true,  // GitHub-flavored Markdown
        breaks: true,
        smartypants: false
    });

    // Load Notes
    const fileInput = document.getElementById('fileInput');
    fileInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                noteArea.value = e.target.result;
            };
            reader.readAsText(file);
        }
    });

    // Save Notes
    saveButton.addEventListener('click', async () => {
        const noteContent = noteArea.value;
        const blob = new Blob([noteContent], { type: "text/markdown" });

        const url = URL.createObjectURL(blob);
        const fileName = "my-quick-note.md";

        try {
            let downloadId = await browser.downloads.download({
                url: url,
                filename: fileName, 
                saveAs: true 
            });

            console.log(`Download started: ${downloadId}`);
        } catch (error) {
            console.error("Download failed:", error);
        }

        setTimeout(() => {
            URL.revokeObjectURL(url); 
        }, 1000);
    });

    // Toggle to Source mode
    sourceBtn.addEventListener("click", () => {
        noteArea.style.display = "block";
        preview.style.display = "none";
    });

    // Toggle to Preview mode
    previewBtn.addEventListener("click", () => {
        preview.innerHTML = marked.parse(noteArea.value);
        MathJax.typesetPromise([preview]).catch((err) => console.error('MathJax typeset failed: ', err));
        noteArea.style.display = "none";
        preview.style.display = "block";
    });
});