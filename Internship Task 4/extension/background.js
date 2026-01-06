chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
    try {

        if (!tab.url || !tab.url.startsWith("http")) {
            return; // invalid or chrome internal url
        }

        const url = new URL(tab.url);
        const domain = url.hostname;

        chrome.storage.local.get([domain], (result) => {
            let time = result[domain] || 0;
            time += 1; // 1 second
            chrome.storage.local.set({ [domain]: time });
        });

    } catch (e) {
        console.log("URL error ignored");
    }
});
