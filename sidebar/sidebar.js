import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";

document.addEventListener("DOMContentLoaded", async () => {
    const noteArea = document.getElementById("noteArea");
    const saveButton = document.getElementById("saveNote");
    const preview = document.getElementById("preview");

    // Load saved notes
    let savedNotes = await browser.storage.local.get("notes");
    if (savedNotes.notes) {
        noteArea.value = savedNotes.notes;
        preview.innerHTML = marked.parse(savedNotes.notes);
    }

    // Save notes on button click
    saveButton.addEventListener("click", async () => {
        const noteContent = noteArea.value;
        await browser.storage.local.set({ notes: noteArea.value });
        preview.innerHTML = marked.parse(noteContent);
        console.log("Note saved!");
    });

    noteArea.addEventListener("input", () => {
        const noteContent = noteArea.value;
        preview.innerHTML = marked.parse(noteContent);
    });
});