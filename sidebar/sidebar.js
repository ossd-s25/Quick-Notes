// sidebar.js
import {
    upperCaseText,
    lowerCaseText,
    capitalizeWords,
    slugify,
    countWords,
    truncateText,
    simpleMdToPlainText,
    minifyJSON,
    formatJSON
} from '../utils.js';

document.addEventListener('DOMContentLoaded', () => {
    const noteArea = document.getElementById('noteArea');
    const resultEl = document.getElementById('result');

    const toUpperBtn = document.getElementById('toUpperBtn');
    const toLowerBtn = document.getElementById('toLowerBtn');
    const capitalizeBtn = document.getElementById('capitalizeBtn');
    const slugifyBtn = document.getElementById('slugifyBtn');
    const truncateBtn = document.getElementById('truncateBtn');
    const md2plainBtn = document.getElementById('md2plainBtn');
    const countBtn = document.getElementById('countBtn');
    const downloadBtn = document.getElementById('downloadBtn');

    const jsonMinifyBtn = document.getElementById('jsonMinifyBtn');
    const jsonFormatBtn = document.getElementById('jsonFormatBtn');

    toUpperBtn.addEventListener('click', () => {
        noteArea.value = upperCaseText(noteArea.value);
        resultEl.textContent = "Converted to uppercase!";
    });

    toLowerBtn.addEventListener('click', () => {
        noteArea.value = lowerCaseText(noteArea.value);
        resultEl.textContent = "Converted to lowercase!";
    });

    capitalizeBtn.addEventListener('click', () => {
        noteArea.value = capitalizeWords(noteArea.value);
        resultEl.textContent = "Capitalized each word!";
    });

    slugifyBtn.addEventListener('click', () => {
        noteArea.value = slugify(noteArea.value);
        resultEl.textContent = "Generated slug!";
    });

    truncateBtn.addEventListener('click', () => {
        noteArea.value = truncateText(noteArea.value, 10);
        resultEl.textContent = "Truncated to 10 words!";
    });

    md2plainBtn.addEventListener('click', () => {
        noteArea.value = simpleMdToPlainText(noteArea.value);
        resultEl.textContent = "Removed simple Markdown formatting!";
    });

    countBtn.addEventListener('click', () => {
        const wordsCount = countWords(noteArea.value);
        resultEl.textContent = `Word count: ${wordsCount}`;
    });

    downloadBtn.addEventListener('click', () => {
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

        resultEl.textContent = "Downloaded my-quick-note.md file.";
    });

    jsonMinifyBtn.addEventListener('click', () => {
        const rawText = noteArea.value;

        const minified = minifyJSON(rawText);
        noteArea.value = minified;

        if (minified === "Invalid JSON input!") {
            resultEl.textContent = "JSON could not be minified: Invalid format or not JSON!";
        } else {
            resultEl.textContent = "Minified to single-line JSON!";
        }
    });

    // Format JSON
    jsonFormatBtn.addEventListener('click', () => {
        const rawText = noteArea.value;
        const formatted = formatJSON(rawText, 2);
        noteArea.value = formatted;

        if (formatted === "Invalid JSON input!") {
            resultEl.textContent = "JSON could not be formatted: Invalid format or not JSON!";
        } else {
            resultEl.textContent = "Formatted JSON! (2-space indentation)";
        }
    });
});
