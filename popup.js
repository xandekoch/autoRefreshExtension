document.getElementById("saveButton").addEventListener("click", function () {
    const refreshInterval = parseInt(document.getElementById("refreshInput").value);
    chrome.runtime.sendMessage({
        type: "update",
        refreshInterval: refreshInterval
    });
});

document.getElementById("startButton").addEventListener("click", function () {
    chrome.runtime.sendMessage({
        type: "start"
    });
});

document.getElementById("stopButton").addEventListener("click", function () {
    chrome.runtime.sendMessage({
        type: "stop"
    });
});