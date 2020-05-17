class DOMNodeCollection{
    constructor(array){
        this.elements = array;

    }

    html(string){
        if(string === undefined){
            return this.elements[0].innerHTML;
        } else{
            this.elements.forEach(el => el.innerHTML = string);
        }
    }

    empty(){
        this.html("");
    }

    append(arg){
        if(typeof arg === 'string'){
            this.elements.forEach(el => el.innerHTML = el.innerHTML + arg);
        } else if (arg instanceof HTMLElement){
             let newEnding = arg.outerHTML;
            this.elements.forEach(el => el.innerHTML = el.innerHTML + newEnding);
        } else {
            let jQObjArray = Array.from(arg);
            jQObjArray.forEach(objects=> {
               let newEnding = objects.outerHTML;
                this.elements.forEach(el => {
                    el.outerHTML = el.outerHTML + objects.innerHTML;
                    objects.outerHTML = "";
                }); 
            })  
            
        }
    }

    attr(string){
        for (let index = 0; index < this.elements.length; index++) {
             if(typeof(this.elements[index].getAttribute(string)) === "string"){
                return this.elements[index].getAttribute(string);
            }
        }
        return undefined;
    }

    addClass(string){
        this.elements[0].setAttribute('class', string);
    }

    removeClass(string){
        let splitArr = arguments;

        if(typeof(string) === "string"){
            splitArr = string.split(" ");
        }
        this.elements.forEach(el =>{
            let attrArr = el.getAttribute("class").split(" ")
            splitArr.forEach( str =>{
                if(attrArr.includes(str)){
                    let idx = attrArr.indexOf(str);
                    attrArr.splice(idx,1);
                }
                if (attrArr.join(" ").length === 0){
                    el.removeAttribute('class');
                } else {
                    el.setAttribute("class", attrArr.join(" "));
                }
               
            })
           
        })
    }

    children(){
        let kids = this.elements[0].children;
        let kidsArr = Array.from(kids);
        return new DOMNodeCollection(kidsArr);
    }

    parent(){
        return this.elements[0].parentElement;
    }

    find(selector){
        return this.elements[0].querySelectorAll(selector);
    }

    remove(){
        this.elements[0].outerHTML = "";
    }

    on(type, listener){
        this.elements[0].addEventListener(type, listener);
        this.elements[0].setAttribute('callback', listener);
    }

    off(type, listener){
        // let listener = this.elements[0].getAttribute('callback').slice(1, (this.elements[0].getAttribute('callback').length-1));
        // debugger
        this.elements[0].removeEventListener(type, listener);
        this.elements[0].removeAttribute('callback');

    } 
}
module.exports = DOMNodeCollection;

