const style = document.createElement('link');
style.setAttribute("rel", "stylesheet");
style.setAttribute("href", 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css');
const head = document.head || document.getElementsByTagName("head")[0] || document.documentElement;
head.insertBefore(style, head.lastChild);


class Shortcuts{
    static modifiers = {
     ctrlKey:'ctrl',
     shiftKey:'shift',
     altKey:'alt' ,
     metaKey:'meta'  //Meta is Mac specific
   };
   shortcutsList = {};
   constructor(name){
     this.similarTo = name;
   }
   addShortcut(shortcut){
     for (const sName in shortcut) {
       this.shortcutsList[sName] = shortcut[sName];
     }
     return this.shotcutsList;
   }
   getShortcut = name => this.shortcutsList[name] ;
   processKeyEvent = (e)=>{
     //e.preventDefault();
     var commandKey = '';
     var commandLevel= 1;
     for (const keyName in Shortcuts.modifiers) {
        if (e[keyName] && !(e['key']=="Control" || e['key']=="Shift" || e['key']=="Alt" || e['key']=="Meta")){commandKey += Shortcuts.modifiers[keyName]+"_";}
     }
     if (commandKey !='' && commandKey !='shift_') {
         commandLevel++;
     }
     commandKey += e.code;
     if (commandLevel>1) {
       if (this.getShortcut(commandKey)) (this.getShortcut(commandKey))();
       else console.log("No command defined");
     }
     else {
        console.log(e.key);
     }
   }
  }
  
  // vs code shortcuts
  const vscodeSort = new Shortcuts('vscode');
  (function() {
    const sel = window.getSelection();
    const range = document.createRange();
    const textarea = document.querySelector("#textarea");
  
    vscodeSort.addShortcut({
    ctrl_KeyA: ()=>{
      
      range.setStart(textarea.firstChild, 0);
      range.setEnd(textarea.lastChild,textarea.lastChild.nodeValue.length);
      sel.removeAllRanges();
      sel.addRange(range);
    },
    ctrl_KeyC: ()=>{
      navigator.clipboard.writeText(sel.getRangeAt(0).toString()).then(function() {
        // copy success code here
      }, function(err) {
        // copy failed code here
      });
    }
  })
  })();
  
  
  // function to convert html elements in js object form
  function htmlToJson(html){
    var tag = {}
    if (html.tagName) {
      tag['tagName']=html.tagName;
    }
    tag['children'] = [];
    tag["#text"]= [];
    for(var i = 0; i< html.childNodes.length;i++){
      if (html.childNodes[i].nodeName ==="#text") {
        if (html.childNodes[i].data.trim()!=="" && html.childNodes[i].data.trim()!=="\n" ) {
          tag["#text"].push(html.childNodes[i].data.trim());
        }
      } else {
        tag['children'].push(htmlToJson(html.childNodes[i]));
      }  
    }
    for(var i = 0; i< html.attributes.length;i++){
      var attr= html.attributes[i];
      tag[`@${attr.name}`] = attr.value;
    }
    return tag;
   }
  
  const elements = document.querySelectorAll("body *");
  for (const key in elements) {
    const element = elements[key];
    if (key < elements.length) {
      element.uniqueId = `element_${key}`;
      
      element.addEventListener('mouseover', (event)=>{
        if (event.target.uniqueId) event.target.classList.add('hoverActive');
      });
      element.addEventListener('mouseout', (event)=>{
        if (event.target.uniqueId) event.target.classList.remove('hoverActive');
      });
      
      element.addEventListener('click', (event)=>{
        if (event.target.uniqueId) {
          if (document.querySelector('.editActive')) {
            document.querySelector("#addNoteIcon").remove();
            document.querySelector('.editActive').classList.remove('editActive')
          }
          event.target.classList.add('editActive');
          addToolbar(event.target);
          const addNoteIcon = document.querySelector("#addNoteIcon");
  
          addNoteIcon.children[0].addEventListener("click", ()=>{
            if (document.querySelector("#textarea")) document.querySelector("#textarea").remove();
            else{
                addtextarea(addNoteIcon)
                textEditorActions();
                document.querySelector("#textarea").addEventListener('keydown', vscodeSort.processKeyEvent);
                document.querySelector('#addNote').addEventListener('click', addNote);
            }
            
          })
        }  
      })
    }
  }
  
  function addToolbar(elem) {
    const addNoteIcon = document.createElement('div');
    addNoteIcon.id = "addNoteIcon";
    addNoteIcon.innerHTML =`<span><i class="far fa-sticky-note"></i></span>`;
    addNoteIcon.offsetLeft =elem.offsetLeft;
    addNoteIcon.offsetTop =elem.offsetTop;
    elem.appendChild(addNoteIcon);
  }
  
  function addtextarea(elem) {
    const editor = document.createElement('div');
    editor.id = "textarea";
    editor.innerHTML = `<div id="tools">
        <span onclick="format('b')"><b>B</b></span>
        <span onclick="format('i')"><i>I</i></span>
        <span onclick="format('u')"><u>U</u></span>
        <span id="tc">A<input type="color"></span>
        <span id="bgc">A<input type="color"></span>
        <span onclick="ul(event)"><i class="fas fa-list-ul"></i></span>
        <span onclick="ol(event)"><i class="fas fa-list-ol"></i></span>
        <span id="addImg"><i class="far fa-image"></i></span>
        <input type="file" accept="image/*">
      </div>
      <div id="textarea" contenteditable="true">Put your Note Here</div>
      <button id="addNote">Add</button>`;
    elem.appendChild(editor);
  }

  async function addNote() {
    let uniqueId = document.querySelector(".editActive").uniqueId;
    let noteValue = document.querySelector("#textarea").innerHTML.trim();
    var value = [];
    console.log(noteValue);
    if (noteValue != "" && noteValue != "\n") {
      await new Promise((resolve, reject)=>{
        chrome.storage.local.get([`${uniqueId}`], (result) => {
          if (result[`${uniqueId}`].length) value = result[`${uniqueId}`]
            resolve();
        });
        reject();
      })
      value.push(noteValue);
      chrome.storage.local.set({[uniqueId]: value}, function() {
        console.log(`Value is ${uniqueId} : ${value}`);
        document.querySelector("#textarea").innerHTML = '';
      });
    }
  }
  
  async function getNotes(elem) {
    let uniqueId = document.querySelector(".editActive").uniqueId;
    var value = [];
    var returnNode = document.createElement('ul');
    await new Promise((resolve, reject)=>{
      chrome.storage.local.get([`${uniqueId}`], (result) => {
        if (result[`${uniqueId}`].length) value = result[`${uniqueId}`]
          resolve();
      });
    })
    for (const key in value) { 
      returnNode.innerHTML += `<li>${value[key]}</li>`;
    }
    elem.innerHTML = returnNode.outerHTML;
  }
