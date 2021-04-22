'use strict';

// Adding stylesheet to page
const style = document.createElement('link');
style.setAttribute("rel", "stylesheet");
style.setAttribute("href", 'https://cdn.quilljs.com/1.3.6/quill.snow.css');
const head = document.head || document.getElementsByTagName("head")[0] || document.documentElement;
head.insertBefore(style, head.lastChild);

//Adding Script to page
const scriptUrl = "https://cdn.quilljs.com/1.3.6/quill.js";
const loadScript = async (url, callback)=>{
  const response = await fetch(url);
  const script = await response.text();
  (Function(script))();
  callback();
}

const addEditor = ()=>{
  const container = document.getElementById('editor');
  if (container) {
    var quill = new Quill(container,{
      modules: {
        toolbar: [
          [{ header: [1, 2, false] }],
          ['bold', 'italic', 'underline'],
          ['image', 'code-block']
        ]
      },
      placeholder: 'Compose an epic...',
      theme: 'snow'  // or 'bubble' 
    });
  }
}

loadScript(scriptUrl, addEditor);

const editor = {
  html : `<span id="closeEditor">&times; </span>
          <div id="editor"></div>
          <button id="setDataBtn">Add</button>`
}

const addEditorContainer = (element)=>{
  const textEditor = document.createElement('div');
  textEditor.id="editorContainer";
  textEditor.innerHTML = editor.html;
  element.classList.add("editorActiveEle");
  element.after(textEditor);
  addEditor();
}

var dataEle = 1;
document.getElementsByTagName('body')[0].addEventListener('click', function (event) {
  const targetElement = event.target;
  const textEditor = document.querySelector("#editorContainer");
  var dataId = targetElement.dataId;
  if (textEditor) {
    if (targetElement == document.getElementById('closeEditor')) {
          document.querySelector(".editorActiveEle").classList.remove("editorActiveEle");
          textEditor.remove();  
      } 
  } 
  else {
      addEditorContainer(targetElement);
      if (dataId) {
        chrome.storage.local.get([`${dataId}`], function(data) {
        console.log(data)
        document.querySelector('#editor').innerHTML = data[`${dataId}`];
      });
      }
      document.getElementById('setDataBtn').addEventListener('click', ()=>{
        var value = document.querySelector("#editor>div.ql-editor").innerHTML;
        if (!targetElement.dataId) {
            targetElement.dataId = `data${dataEle++}`;
        }
        dataId = targetElement.dataId;
            console.log(` ${dataId} : ${value}` );
      })
    }
});