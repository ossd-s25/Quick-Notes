// import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";

document.addEventListener("DOMContentLoaded", async () => {
    const noteArea = document.getElementById("noteArea");
    const saveButton = document.getElementById("saveNote");
    const preview = document.getElementById("preview");
    const result = document.getElementById("result");
    const sourceBtn = document.getElementById("sourceBtn");
    const previewBtn = document.getElementById("previewBtn");

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
    saveButton.addEventListener('click', () => {
        const noteContent = noteArea.value;
        const blob = new Blob([noteContent], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = 'my-quick-note.md';
        a.click();

        setTimeout(() => {
            URL.revokeObjectURL(url);
        }, 1000);

        // resultEl.textContent = "Downloaded my-quick-note.md file.";
    });

    // Toggle to Source mode
    sourceBtn.addEventListener("click", () => {
        noteArea.style.display = "block";
        preview.style.display = "none";
    });

    // Toggle to Preview mode
    previewBtn.addEventListener("click", () => {
        preview.innerHTML = marked.parse(noteArea.value);
        noteArea.style.display = "none";
        preview.style.display = "block";
    });

    // Save notes on button click
    saveButton.addEventListener("click", async () => {
        const noteContent = noteArea.value;
        await browser.storage.local.set({ notes: noteArea.value });
        preview.innerHTML = marked.parse(noteContent);
    });


});