
document.addEventListener('DOMContentLoaded', async function () {
  const form = document.querySelector('form');
  let queryOptions = { url: "https://thirtydollar.website/" };
  let [tab] = await chrome.tabs.query(queryOptions);
  let title = document.querySelector('h1')
  let tabid
  if (!tab) {
    document.getElementById('sbut').disabled = true
    title.innerHTML = "No thirty dollar website found, please open page"
    return
  } else {
    document.getElementById('sbut').disabled = false
    title.innerHTML = "Tab found!"
    tabid = tab.id
  }
  //
  chrome.tabs.sendMessage(tabid, { action: "checkInjected" }, function (response) {
    if (chrome.runtime.lastError) {
      chrome.scripting.executeScript({target: {tabId: tabid}, files: ["insertSound.js"]})     
    }
  });
  form.addEventListener('submit', async function (event) {
    event.preventDefault();
    const soundName = form.querySelector('#sound-name').value;
    const soundCredit = form.querySelector('#sound-credit').value || "";
    const soundType = form.querySelector('#sound-type').value;
    let soundImage = form.querySelector('#sound-image').files[0];
    let soundAudio = form.querySelector('#sound-audio').files[0];
    let fr = new FileReader()
    fr.readAsDataURL(soundAudio)
    fr.onload = (e) => {
      soundAudio = fr.result
      fr.readAsDataURL(soundImage)
      fr.onload = (e) => {
        soundImage = fr.result
        chrome.tabs.sendMessage(tabid, {name: soundName, credit: soundCredit, type: soundType, image: soundImage, audio: soundAudio})
      };
      fr.onerror = (e) => {
        return
      }
    };
    fr.onerror = (e) => {
      return
    }
  }); 
});

