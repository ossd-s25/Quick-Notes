<div align="center">
    <img src="figs/title.png" alt="Quick Notes" width="300" height="auto">

**A note taking extension for Mozilla Firefox**
</div>

## Introduction

Quick Notes is an extension designed for [Mozilla Firefox](https://www.mozilla.org/en-US/firefox/). With Quick Notes, you can open a sidebar, take notes with Markdown and LaTeX support, and save and load them whenever you want!

## Markdown & LaTeX Support  
![render](figs/render.jpg)  

### Markdown  
Quick Notes allows you to write and render Markdown syntax, making it easy to format text, add lists, insert links, and more. The rendering is handled by the open-source JS package [Marked](https://github.com/markedjs/marked).  

### LaTeX  
LaTeX syntax is supported for mathematical expressions and equations, enabling seamless integration of formulas. This functionality is powered by [MathJax](https://github.com/mathjax/MathJax).  

## Seamless Switch Between Modes
![switch_mode](figs/switch_mode.gif)
Quick Notes provides source mode and preview mode. You can toggle to switch between the two modes seamlessly (just as you can on github).

## Free Resize of Window
![resize](figs/window_resize.gif)

You can freely resize the text box to adjust its width and height according to your needs.

### How It Works:
- **Drag left or right** with your mouse to adjust the width.
- **Drag downward** to extend the height for more writing space.

This feature provides flexibility, allowing you to customize the note-taking area for better readability and convenience.


## Save \& Load Notes
![save_load](figs/save_load.gif)
You can load your notes from any file of your choice using the **Load** feature. This allows you to open previously saved notes from your system and continue editing them.

### How It Works:
1. Click the **Load** button.
2. Select the file you want to open.
3. The content will be loaded into Quick Notes for further editing.

This feature provides flexibility by allowing you to choose files from any directory.

### Save Notes with Custom Path Selection

You can save your notes and choose where to download them on your system.

### How It Works:
1. Click the **Save** button.
2. Choose the location where you want to save the file.
3. The file will be downloaded to your selected path.

Due to file system write access restrictions on JavaScript scripts, this is powered by the `browser.downloads` API provided by **Firefox**.

## Undo Changes
![undo](figs/undo.gif)

You can undo changes in Quick Notes using **Ctrl + Z** to revert your last edits.

### How It Works:
- Unlike built-in system undo functions, this feature is implemented using a **stack**.
- Every change is stored in the stack, allowing you to **undo continuously** until you reach the initial state.
- This ensures that even after multiple edits, you can always go back to the starting point.

With this functionality, you can easily correct mistakes and restore previous content efficiently.
## Open Source Project Best Practices
We adopted the best practices of open source projects in Quick Notes, including [README.md](README.md), [MIT LICENSE](LICENSE), [Code of Conduct](CODE_OF_CONDUCT.md) (adopted from Contributor Covenant Code of Conduct), and [Contribution Guidelines](CONTRIBUTING.md).

## Our Team
- [Yufeng(Felix) Xu](https://zephyr271828.github.io/)
- [Haocheng(Jason) Lu](https://github.com/LuHC409)
- [Alvaro Martinez](https://github.com/AlvaroMartinezM)

