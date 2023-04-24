
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.action === "checkInjected") {
        sendResponse({ isInjected: true });
        return
    }
    let div = document.createElement("div")
    div.className = "sound"
    div.setAttribute("soundname", message.name)
    div.setAttribute("soundorigin", message.credit)
    div.setAttribute("sound", message.audio)
    let str = message.name.replace(/\s/g, '').toLowerCase();
    div.setAttribute("str", str)
    let img = document.createElement("img")
    img.alt = message.name
    img.src = message.image
    div.appendChild(img)
    document.getElementById("icons").appendChild(div)
});
