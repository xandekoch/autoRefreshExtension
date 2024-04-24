chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.type === "clickButton") {
        var button = document.evaluate('//*[@id="task-index"]/div[2]/ul/li/a', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        if (button) {
            console.log("Button found.");
            button.click();
            // chrome.runtime.sendMessage({ type: "stop" });
        } else {
            console.error("Button not found.");
        }
    }
});