// background.js


browser.runtime.onInstalled.addListener((details) => {
    if (details.reason === "install") {
      console.log("My Quick Notes Already Downloaded");

    }
  });
  
  