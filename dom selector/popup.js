var button = document.getElementById('button');

button.onclick = function(element) {
  // var getData = document.getElementById("getData");
  // chrome.storage.local.get(['editorText'], function(data) {
  //   if (!data) {
  //     data = "Empty!!";
  //   }
  //   getData.innerHTML =  'Value currently is ' + data.editorText;
  // });
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {command: "init"}, function(response) {
            console.log(response.result);
    });
    });
};
