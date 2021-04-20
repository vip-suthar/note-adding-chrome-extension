var editor = {
    html : `<span id="closeEditor">Close</span>
    <div class="textbox" id="sampleeditor" contenteditable="true"></div>
        <button id="setDataBtn">Add</button>`
}
var dataEle = 1;
document.getElementsByTagName('body')[0].addEventListener('click', function (event) {
    var targetElement = event.target;
    var textEditor = document.querySelector("#editor.editor");
    if (targetElement != document.getElementById('closeEditor')) {
        if (!textEditor) {
            textEditor = document.createElement('div');
            textEditor.id="editor";
            textEditor.className="editor";
            textEditor.innerHTML = editor.html;
            targetElement.parentElement.appendChild(textEditor);
            var dataId = targetElement.dataId;
            console.log(dataId);
            if (dataId) {
                chrome.storage.local.get([`${dataId}`], function(data) {
                    console.log(data)
                document.querySelector('.textbox#sampleeditor').innerHTML = data[`${dataId}`];
              });
            }
            

            document.getElementById('setDataBtn').addEventListener('click', ()=>{
                var value = document.querySelector("#sampleeditor.textbox").innerHTML;
                if (!targetElement.dataId) {
                    targetElement.dataId = `data${dataEle++}`;
                }
                var dataId = targetElement.dataId;
                chrome.storage.local.set({[dataId] : value} , function() {
                    console.log(`Value is set to  ${value} with dataId ${dataId} : ${value}` );
                });
            })
             
        }
    } else {
        textEditor.remove();
    }
});
