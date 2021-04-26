var button = document.getElementById('button');

button.onclick = function(element) {
 
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {command: "init"}, function(response) {
            console.log(response.result);
    });
    });
};
const dataDiv=  document.querySelector('div#data');
// let uniqueId = document.querySelector(".editActive").uniqueId;
//     var value = [];
//     var returnNode = document.createElement('ul');
//     await new Promise((resolve, reject)=>{
//       chrome.storage.local.get([`${uniqueId}`], (result) => {
//         if (result[`${uniqueId}`].length) value = result[`${uniqueId}`]
//           resolve();
//       });
//     })
//     for (const key in value) { 
//       returnNode.innerHTML += `<li>${value[key]}</li>`;
//     }
//     elem.innerHTML = returnNode.outerHTML;

// chrome.storage.onChanged.addListener(function (changes, namespace) {
//   for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
      
    
//   }
// });
