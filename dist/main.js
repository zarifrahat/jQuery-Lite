/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/dom_node_collection.js":
/*!************************************!*\
  !*** ./src/dom_node_collection.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class DOMNodeCollection{\n    constructor(array){\n        this.elements = array;\n\n    }\n\n    html(string){\n        if(string === undefined){\n            return this.elements[0].innerHTML;\n        } else{\n            this.elements.forEach(el => el.innerHTML = string);\n        }\n    }\n\n    empty(){\n        this.html(\"\");\n    }\n\n    append(arg){\n        if(typeof arg === 'string'){\n            this.elements.forEach(el => el.innerHTML = el.innerHTML + arg);\n        } else if (arg instanceof HTMLElement){\n             let newEnding = arg.outerHTML;\n            this.elements.forEach(el => el.innerHTML = el.innerHTML + newEnding);\n        } else {\n            let jQObjArray = Array.from(arg);\n            jQObjArray.forEach(objects=> {\n               let newEnding = objects.outerHTML;\n                this.elements.forEach(el => {\n                    el.outerHTML = el.outerHTML + objects.innerHTML;\n                    objects.outerHTML = \"\";\n                }); \n            })  \n            \n        }\n    }\n\n    attr(string){\n        for (let index = 0; index < this.elements.length; index++) {\n             if(typeof(this.elements[index].getAttribute(string)) === \"string\"){\n                return this.elements[index].getAttribute(string);\n            }\n        }\n        return undefined;\n    }\n\n    addClass(string){\n        this.elements[0].setAttribute('class', string);\n    }\n\n    removeClass(string){\n        let splitArr = arguments;\n\n        if(typeof(string) === \"string\"){\n            splitArr = string.split(\" \");\n        }\n        this.elements.forEach(el =>{\n            let attrArr = el.getAttribute(\"class\").split(\" \")\n            splitArr.forEach( str =>{\n                if(attrArr.includes(str)){\n                    let idx = attrArr.indexOf(str);\n                    attrArr.splice(idx,1);\n                }\n                if (attrArr.join(\" \").length === 0){\n                    el.removeAttribute('class');\n                } else {\n                    el.setAttribute(\"class\", attrArr.join(\" \"));\n                }\n               \n            })\n           \n        })\n    }\n\n    children(){\n        let kids = this.elements[0].children;\n        let kidsArr = Array.from(kids);\n        return new DOMNodeCollection(kidsArr);\n    }\n\n    parent(){\n        return this.elements[0].parentElement;\n    }\n\n    find(selector){\n        return this.elements[0].querySelectorAll(selector);\n    }\n\n    remove(){\n        this.elements[0].outerHTML = \"\";\n    }\n\n    on(type, listener){\n        this.elements[0].addEventListener(type, listener);\n        this.elements[0].setAttribute('callback', listener);\n    }\n\n    off(type, listener){\n        // let listener = this.elements[0].getAttribute('callback').slice(1, (this.elements[0].getAttribute('callback').length-1));\n        // debugger\n        this.elements[0].removeEventListener(type, listener);\n        this.elements[0].removeAttribute('callback');\n\n    } \n}\nmodule.exports = DOMNodeCollection;\n\n\n\n//# sourceURL=webpack:///./src/dom_node_collection.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const DOMNodeCollection = __webpack_require__(/*! ./dom_node_collection.js */ \"./src/dom_node_collection.js\");\n\nfunction $l(arg){\n    if (arg instanceof HTMLElement){\n        let array = [arg];\n        return new DOMNodeCollection(array);\n    } else if(typeof(arg)=== 'string'){\n         let selected = document.querySelectorAll(arg);\n        let nodeArray = Array.from(selected);\n\n        return new DOMNodeCollection(nodeArray);\n    }\n   \n};\n\nwindow.$l = $l;\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });