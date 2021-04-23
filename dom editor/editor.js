var data = {};

//console.log(document.querySelector("h1").children);
//console.log(data)
const elements = document.querySelectorAll("body *");

for (const key in elements) {
  const element = elements[key];
  if (key < elements.length) {
    element.uniqueId = `element_${key}`;
    var editIcon = document.getElementById("editIcon");
    element.addEventListener('mouseover', (event)=>{
      if (event.target.uniqueId) {
        event.target.classList.add('hoverActive');
      }
    });
    element.addEventListener('mouseout', (event)=>{
      if (event.target.uniqueId) {
        event.target.classList.remove('hoverActive');
      }
    });
    
    element.addEventListener('click', (event)=>{
      if (event.target.uniqueId) {
        if (document.querySelector('.editActive')) {
        document.querySelector('.editActive').classList.remove('editActive');
      }
      if(!editIcon){
        editIcon = document.createElement('span');
        editIcon.id = "editIcon";
        editIcon.innerHTML = "Icon";
      }
        event.target.classList.add('editActive');
        event.target.before(editIcon);
        editIcon.addEventListener("click", ()=>{
          document.querySelector(".editActive").contentEditable = true;
          document.querySelector(".editActive").addEventListener('keydown', dataInput)
        })
      }  
    })
  }
}


// var shift_nums = {
//   "`":"~", "1":"!", "2":"@", "3":"#", "4":"$", "5":"%", "6":"^", "7":"&","8":"*", "9":"(", "0":")", "-":"_", "=":"+", ";":":", "'":"\"", ",":"<", ".":">", "/":"?",  "\\":"|"
//   };
//   //Special Keys - and their codes
//   var special_keys = {
//   'esc':27, 'escape':27, 'tab':9,'space':32, 'return':13, 'enter':13, 'backspace':8,
  
//   'scrolllock':145,'scroll_lock':145,'scroll':145,'capslock':20,'caps_lock':20,'caps':20,'numlock':144, 'num_lock':144, 'num':144,
  
//   'pause':19,'break':19,
  
//   'insert':45,'home':36,'delete':46, 'end':35,
  
//   'pageup':33,'page_up':33,'pu':33,
  
//   'pagedown':34,'page_down':34,'pd':34,
  
//   'left':37,'up':38,'right':39,'down':40,
  
//   'f1':112,'f2':113,'f3':114, 'f4':115, 'f5':116,'f6':117,'f7':118,'f8':119,'f9':120,'f10':121,'f11':122,'f12':123
//   }
  
//   var modifiers = {
//   shift: { wanted:false, pressed:false},
//   ctrl : { wanted:false, pressed:false},
//   alt  : { wanted:false, pressed:false},
//   meta : { wanted:false, pressed:false} //Meta is Mac specific
//   };

function dataInput(event) {
  event.preventDefault();
  if (event.keyCode>=65 && event.keyCode<=90) {
    event.target.innerHTML += event.key;
  }
  else if (event.keyCode==8) {
    event.target.innerHTML=event.target.innerHTML.slice(0,event.target.innerHTML.length-1);
  }
  else{
    console.log(`Special Key ${event.code} Pressed`);
  }
  data= htmlToJson(document.querySelector("body"));
}
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
 data= htmlToJson(document.querySelector("body"));
 