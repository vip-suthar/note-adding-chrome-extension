const sel = window.getSelection();
  const textColor = document.querySelector('#tools>#tc');
  const backgroundColor = document.querySelector('#tools>#bgc');
  const textarea = document.querySelector("#textarea"); 

  textColor.addEventListener('click',()=>{
    textColor.children[0].click();
    textColor.children[0].addEventListener('change',()=>{
    textColor.style.color= textColor.children[0].value;
      format('span','style["color"]', textColor.children[0].value );
    })
  })
  backgroundColor.addEventListener('click',()=>{
    backgroundColor.children[0].click();
    backgroundColor.children[0].addEventListener('change',()=>{
      backgroundColor.style.backgroundColor= backgroundColor.children[0].value;
      format('span','style["backgroundColor"]', backgroundColor.children[0].value )
    })
  })


  document.querySelector('#tools>#addImg').addEventListener('click',()=>{
    document.querySelector('#tools>input[type="file"]').click();
    if (sel.rangeCount > 0) {
      var range = sel.getRangeAt(0);
      var filesSelected = document.querySelector('#tools>input[type="file"]').files;
      console.log(filesSelected)
      if (filesSelected.length > 0 && filesSelected[0].type.match("image.*")) {
        var fileReader = new FileReader();
        fileReader.readAsDataURL(filesSelected[0]);
        fileReader.onload = function(e){
          var img = document.createElement("img");
          img.src = e.target.result;
          img.width="250";
          img.style.display="block";
          range.insertNode(img);
        }
      }
    }
  })

  const manualCaret= (add)=>{
    const caret = document.querySelector("#textarea>span#caret");
    if(add){
      if (!caret) {
        const span = document.createElement('span');
        span.id="caret";
        span.innerHTML = "|";
        setInterval(()=>{
          span.style.visibility = (span.style.visibility=='hidden') ? 'visible' : 'hidden';
        }, 200)
        return span;
      }
    }
    else if (caret){
      caret.remove();
    }
  }
  
//adding and removing caret manually
  textarea.addEventListener('focus',()=>{
    let range = document.createRange();
    if (!range.rangeCount) {
      range.setStart(textarea.lastChild, getCaretCharacterOffset(textarea))
      range.collapse(true);
      sel.removeAllRanges();
      sel.addRange(range)
    }
    range.insertNode(manualCaret(1))

  })
  textarea.addEventListener('blur',()=>{manualCaret();})
  textarea.addEventListener('click',()=>{
    manualCaret();
    let range = document.createRange();
    if (!range.rangeCount) {
      range.setStart(textarea.lastChild, getCaretCharacterOffset(textarea.lastChild))
    }
    else {
      range.setStart(range.startContainer, getCaretCharacterOffset(range.startContainer))
    
    }
    range.collapse(true);
    sel.removeAllRanges();
    sel.addRange(range)
    range.insertNode(manualCaret(1));
  })
  function getCaretCharacterOffset(element) {
    var caretOffset = 0;
    var doc = element.ownerDocument || element.document;
    var win = doc.defaultView || doc.parentWindow;
    var sel;
    if (typeof win.getSelection != "undefined") {
      sel = win.getSelection();
      if (sel.rangeCount > 0) {
          var range = win.getSelection().getRangeAt(0);
          var preCaretRange = range.cloneRange();
          preCaretRange.selectNodeContents(element);
          preCaretRange.setEnd(range.endContainer, range.endOffset);
          caretOffset = preCaretRange.toString().length;
      }
    } else if ( (sel = doc.selection) && sel.type != "Control") {
      var textRange = sel.createRange();
      var preCaretTextRange = doc.body.createTextRange();
      preCaretTextRange.moveToElementText(element);
      preCaretTextRange.setEndPoint("EndToEnd", textRange);
      caretOffset = preCaretTextRange.text.length;
    }
    return caretOffset;
  }



//code to be verified, not working

/* const format = (command)=>{
const el = document.querySelector("#textarea");
var range;
const sel = window.getSelection();
if (typeof sel != "undefined") {
if (sel.rangeCount > 0) {
    range = sel.getRangeAt(0);
    let oldContent = document.createTextNode(range.toString());
    const newElement = document.createElement(command);
    newElement.append(oldContent);
    range.deleteContents();
    range.insertNode(newElement);
    range.setStart(newElement, 0);
    range.collapse(true);

    console.log(range.startContainer)
}
}
} */