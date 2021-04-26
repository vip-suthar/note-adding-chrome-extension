function htmlToJson(html){
    var tag = {}
    if (html.tagName) tag['tagName']=html.tagName;
    if(html.uniqueId) tag['uniqueId']=html.uniqueId;
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
