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