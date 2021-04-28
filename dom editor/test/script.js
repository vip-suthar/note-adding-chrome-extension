
class Shortcuts{
  static modifiers = {
   ctrlKey:'ctrl',
   shiftKey:'shift',
   altKey:'alt' ,
   metaKey:'meta'  //Meta is Mac specific
 };
 static special_keys = {
  'esc':27, 'tab':9,'space':32, 'enter':13, 'backspace':8, 'delete':46,

  'scroll_lock':145, 'caps_lock':20, 'num_lock':144, 'pause':19, 'insert':45,'home':36, 'end':35, 'page_up':33, 'page_down':34,
  
  'left':37,'up':38,'right':39,'down':40,
  
  'f1':112,'f2':113,'f3':114, 'f4':115, 'f5':116,'f6':117,'f7':118,'f8':119,'f9':120,'f10':121,'f11':122,'f12':123
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
   var commandKey = '';
   var commandLevel= 0;
   var special_keys_codes = Object.values(Shortcuts.special_keys);
   for (const keyName in Shortcuts.modifiers) {
      if (e[keyName] && !(e['key']=="Control" || e['key']=="Shift" || e['key']=="Alt" || e['key']=="Meta")){commandKey += Shortcuts.modifiers[keyName]+"_";}
   }
   if (commandKey !=''){
     commandLevel=2;
     if (commandKey =='shift_' && !special_keys_codes.includes(e.keyCode)) commandLevel=0;
   }
   else{
     commandLevel = 0;
     if (special_keys_codes.includes(e.keyCode)) commandLevel=1;
     if (e['key']=="Control" || e['key']=="Shift" || e['key']=="Alt" || e['key']=="Meta") commandLevel = -1;
   }

   commandKey += e.code;
   if (commandLevel===2) {
    e.preventDefault();
    // console.log("cmd lvl 2 called");
    if (this.getShortcut(commandKey)) (this.getShortcut(commandKey))();
    else console.log("No command defined");
   }
   else if (commandLevel===1) {
    // console.log("cmd lvl 1 called");
    if (e.keyCode>=37 && e.keyCode<=40) setCaret(e);
    else e.preventDefault = false;
   }
   else if (commandLevel===0) {
    // console.log("cmd lvl 0 called");
    e.target.innerHTML += e.key;
    console.log("cmd lvl 0 called")
   }
   else{
    console.log("cmd lvl -1 called, Key:"+e.code)
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

/* 
*
*code which is not working.
*
*/
const el = document.querySelector("#textarea");

const format = (command)=>{
  const sel = window.getSelection();
  
  if (typeof sel != "undefined") {
    if (sel.rangeCount > 0) {
      var range = sel.getRangeAt(0);
      var oldContents = range.cloneRange().toString();
      range.deleteContents();
      var newElement = document.createElement(command);
      if (oldContents!='') newElement.append(oldContent)
      else newElement.innerHTML = "&nbsp;";
      range.insertNode(newElement);
      range.setStartAfter(newElement);
      range.collapse(true);
      //console.log(range.startContainer)
  }
  }
  } 

  //        caret                 //
  const setCaret = (e=0) => {
    removeCaret();
    const sel = window.getSelection();
    if (sel.rangeCount) {
      const range = sel.getRangeAt(0);
      console.log(sel.anchorNode);
       console.log(sel.focusNode);
       console.log(sel.anchorOffset);
       console.log(sel.focusOffset);
      // console.log(ca.wholeText);
      // let prefix = ca.wholeText.substring(0,getCaretCharacterOffsetWithin(ca));
      // let suffix = ca.wholeText.substring(getCaretCharacterOffsetWithin(ca));
      if (e.keyCode==37) {
       
      }
      //range.setEnd(range.endContainer,range.endOffset);
      //range.collapse(false);
      
      range.insertNode(addCaret());
      // sel.removeAllRanges();
      // sel.addRange(clone)
    }
    //return prefix.toString().length;
  };

  const addCaret= ()=>{
    const caret = document.querySelector("#textarea span#caret");
    if (!caret) {
    const span = document.createElement('span');
    span.id="caret";
    span.innerHTML = "|";
    //span.style.position = "absolute"
    setInterval(()=>{
    span.style.visibility = (span.style.visibility=='hidden') ? 'visible' : 'hidden';
    }, 200)
    return span;
    }
  }
  const removeCaret = ()=>{
    const caret = document.querySelector("#textarea span#caret");
    if (caret) caret.remove();
  }


  el.addEventListener('focus',()=>{setCaret()})
  el.addEventListener('blur',()=>{removeCaret()})
  el.addEventListener('click',()=>{setCaret()})
  el.addEventListener('keydown',vscodeSort.processKeyEvent);

  function getCaretCharacterOffsetWithin(element) {
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
    } else if ((sel = doc.selection) && sel.type != "Control") {
        var textRange = sel.createRange();
        var preCaretTextRange = doc.body.createTextRange();
        preCaretTextRange.moveToElementText(element);
        preCaretTextRange.setEndPoint("EndToEnd", textRange);
        caretOffset = preCaretTextRange.text.length;
    }
    return caretOffset;
}
}
} */
