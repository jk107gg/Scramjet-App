// Version 1.0.1 - Forced Update
"use strict";

const form = document.getElementById("sj-form");
const address = document.getElementById("sj-address");
const searchEngine = document.getElementById("sj-search-engine");

// This line handles the variable name change in the Scramjet engine
const controllerLoader = window.$scramjetLoadController || window.__scramjet$loadController;

if (!controllerLoader) {
    console.error("CRITICAL: Scramjet engine parts failed to load from CDN. Check your index.html script tags!");
} else {
    const { ScramjetController } = controllerLoader();

// Replace your ScramjetController block with this:
const scramjet = new ScramjetController({
    files: {
        wasm: "https://cdn.jsdelivr.net/gh/MercuryWorkshop/scramjet-app@main/public/scram/scramjet.wasm.wasm",
        all: "https://cdn.jsdelivr.net/gh/MercuryWorkshop/scramjet-app@main/public/scram/scramjet.all.js",
        sync: "https://cdn.jsdelivr.net/gh/MercuryWorkshop/scramjet-app@main/public/scram/scramjet.sync.js",
    },
});
    scramjet.init();

    // Using a public Bare server so you don't need local 'baremux' folders
    const connection = new BareMux.BareMuxConnection("https://bare.benropt.me/bare/");

    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        
        // This stops the 'nothing happens' bug by logging to the console
        console.log("Orbit Engine processing:", address.value);

        try {
            // This function is usually in register-sw.js
            if (typeof registerSW === 'function') {
                await registerSW();
            }
            
            // This function is usually in search.js
            const url = search(address.value, searchEngine.value);
            
            const frame = scramjet.createFrame();
            frame.frame.id = "sj-frame";
            document.body.appendChild(frame.frame);
            frame.go(url);
        } catch (err) {
            console.error("Proxy Error:", err);
        }
    });
}
