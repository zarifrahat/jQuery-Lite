const DOMNodeCollection = require("./dom_node_collection.js");

function $l(arg){
    if (arg instanceof HTMLElement){
        let array = [arg];
        return new DOMNodeCollection(array);
    } else if(typeof(arg)=== 'string'){
         let selected = document.querySelectorAll(arg);
        let nodeArray = Array.from(selected);

        return new DOMNodeCollection(nodeArray);
    }
   
};

window.$l = $l;
