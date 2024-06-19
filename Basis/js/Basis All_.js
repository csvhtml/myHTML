// ################################################################
// Log                                                            #
// ################################################################

class clsLog {
    constructor() {
        this.logs= []
    }

    Add(msg) {
        if (LOGG) {
            this.logs.push(msg)
            console.log(msg)
        }
    }
}

// ################################################################
// Assert                                                         #
// ################################################################

function assert(condition, message) {
    if (!condition) {
        throw new Error(message || "Assertion failed");
    }
}

// ################################################################
// Useful functions                                               #
// ################################################################

function _RemoveBlanksInList(liste) {
    let ret = []
    for (ele of liste) {
        ret.push(ele.replace(" ", "_"))
    }

    return ret
}

function noBlank(text) {
    return text.replace(" ", "_")
}

function _byVal(data) {
    if ( ["bool", "str", "int"].indexOf(typOf(data)) >-1) {
        return data}

    if (typOf(data) == "list") {
        let ret = []
        for (let element of data) {
            ret.push(_byVal(element))}
        return ret}
    
    if (typOf(data) == "dict") { 
        let ret = { }
        let keys= Object.keys(data)
        for (key of keys) {
            ret[key] = _byVal(data[key])}
        return ret}

    return data
}

function ValidChars(validChars, text) {
    for (char of text) {
        if (!validChars.includes(char)) {
            return false}
    }
    return true
}

function typOf(variable) {
    if (Array.isArray(variable)) {
        return 'list'} // javascript 'Array'
    if (typeof variable === 'object' && variable !== null) {
        return 'dict'} // javascript 'Object'
    if (typeof variable === 'string') {
        return 'str'}
    if (typeof variable === 'number') {
        return 'int'}
    if (typeof variable === 'boolean') {
        return 'bool'}
    if (variable == null) {
        return 'null'}
    if (variable == undefined) {
        return 'undefined'}

    assert(false, String(variable))
}

function IsEqual(a,b, max_iterations = 100) {
    if (max_iterations<1) {
        return false}
    if (typOf(a)!=typOf(b)) {
        return false}

    if (typOf(a) == "bool") {
        if (a == b) {
            return true}
        return false}

    if (typOf(a) == "int") {
        if (a == b) {
            return true}
        return false}

    if (typOf(a) == "str") {
        if (a == b) {
            return true}
        return false}

    if (typOf(a) == "list") {
        if (!(a.length == b.length)) {
            return false}
        for (let i = 0; i< a.length; i++) {
            if (IsEqual(a[i], b[i], max_iterations-1) == false) {
                return false}
        }
        return true
    }

    if (typOf(a) == "dict") {
        let keysA = Object.keys(a)
        let keysB= Object.keys(b)
        if (keysA.length !== keysB.length) {
            return false}
        for (let key of keysA) {
            if (!b.hasOwnProperty(key)) {
                return false}
        }
        for (let key of keysA) {
            if (IsEqual(a[key], b[key], max_iterations-1) == false) {
                return false}
        }
        return true
    }

    if (typOf(a) == "null") {
        if (typOf(b) == "null") {
            return true}
    }

    if (typOf(a) == "undefined") {
        if (typOf(b) == "undefined") {
            return true}
    }

    return false
}

function IsListEqualSize(a,b, flag = false) {
    if (typOf(a) == "list" && typOf(b) == "list") {
        if (a.length == b.length) {
            return IsListEqualSize(a[0],b[0], true)}
        return false}
    if (flag) {
        if (typOf(a) == "list" || typOf(b) == "list") {
            return false}
        else {
            return true}
    }
    else {
        return false}
}

function IsListEqualDepth(a,b, flag = false) {
    if (typOf(a) == "list" && typOf(b) == "list") {
            return IsListEqualDepth(a[0],b[0], true)}
    if (flag) {
        if (typOf(a) == "list" || typOf(b) == "list") {
            return false}
        else {
            return true}
    }
    else {
        return false}
}

function ElementInArrayN(array, element) {
    for (let i = 0; i < array.length; i++) {
        if (typOf(array[i]) == "list") {
            if (ElementInArrayN(array[i], element)) {
                return true}
        } 
        else if (array[i] === element) {
            return true;
        }
    }
    return false; 
}

Object.defineProperties(DOMTokenList.prototype, {
    addX: {
        value: function(element) {
            if (!this.contains(element)) {
                this.add(element)}
            }
        }
});

Object.defineProperties(DOMTokenList.prototype, {
    removeX: {
        value: function(element) {
            if (this.contains(element)) {
                this.remove(element)}
            }
        }
});

Object.defineProperties(Object.prototype, {
    key: {
        value: function(n) {
            let count = 0
            for (var key in this) {
                if (count == n) {
                    return key;}
                count += 1
              }
              return null;
            }  
    } 
}); 

Object.defineProperties(String.prototype, {
    count: {
        value: function(n) {
            let count = 0;
            for (let i = 0; i < this.length; i++) {
                if (this[i] === n) {
                    count++;
                }
            }
            return count;
        }
    } 
}); 

// ################################################################
// Usefull DOM functions                                          #
// ################################################################

function ElemementsWithOnClickFunctions (mode="") {
    // let allElements = document.getElementsByTagName('*');
    let allElements = document.getElementsByTagName('*');
    let ret = []
    for ( var i = 0; i<allElements.length; i++ ) {
        if ( typeof allElements[i].onclick === 'function' ) {
            if (mode == "") {
                ret.push(allElements[i])}
            if (mode == "id") {
                assert(allElements[i].id != "")
                ret.push(allElements[i].id)}
            if (mode == "function") {
                ret.push(allElements[i].attributes['onclick'].value)}
        }
    }
    return ret
}

function ElemementsWithSubStringInID (fixx =  [], mode="") {
    // let allElements = document.getElementsByTagName('*');
    let allElements = document.getElementsByTagName('*');
    let ret = []
    for ( var i = 0; i<allElements.length; i++ ) {
        for (fix of fixx) {
            if (allElements[i].id.includes(fix)) {
                if (mode == "") {
                    ret.push(allElements[i])}
                if (mode == "id") {
                    assert(allElements[i].id != "")
                    ret.push(allElements[i].id)}
            }
        }
    }
    return ret
}


function ReturnParentUntilID (element, targetID = "", iterations = 10) {
    let parent = element
    for (i = 0; i<iterations; i++) {
        if (parent.tagName == "BODY") {
            assert(false)}
        if (parent.id == "") {
            parent = parent.parentElement
        } else {
            return parent}
    }
    assert(false)
}

function DivIsDescendantOf (element, targetID, iterations = 10) {
    let parent = element
    for (i = 0; i<iterations; i++) {
        if (parent.tagName == "BODY") {
            return false
        }
        if (parent.id == targetID) {
            return true
        } else if (parent.parentElement == undefined) {
            return false // if parents are not fully traced... you dont know
        } else {
            parent = parent.parentElement}
    }
    assert(false)
}

function DOMElementsFromString(htmlString, tag = 'div') {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');
    const svgElements = doc.querySelectorAll(tag);
    return Array.from(svgElements);
}



// ################################################################
// test                                                           #
// ################################################################

function test_Basis() {
    test_Basis_byVal()
    test_Basis_RetStringBetween()   
    test_Basis_FileNameFromPath()  
    test_Basis_typOf()
    test_Basis_IsEqual() 
    return 0 // 32 assertions in this file (and should all be catched)
}

function test_Basis_IsEqual() {
    let fname = arguments.callee.name;
    
    let test = [
        [true, true, true],
        [false, false, true],
        [false, true, false],
        [true, false, false],
        [1, 1, true],
        [1, 2, false],
        [1, "1", false],
        ["1", "1", true],
        ["Hello", "Hello", true],
        ["Hello", "World", false],
        [[1,2,3], [1,2], false],
        [[1,2,3], [1,7,3], false],
        [[1,2,3], [1,2,3], true],
        [{"A": "Hallo", "B":"Welt"}, {"A": "Hallo", "B":"Welt"}, true],
        [{"A": "Hallo", "B":"Welt"}, {"A": "Hallo"}, false],
        [{"A": "Hallo", "B":"Welt"}, {"A": "Hallo", "C":"Welt"}, false],
        [{"A": "Hallo", "B":"Welt"}, {"A": "Hallo", "B":"World"}, false],
        [{"A": "Hallo", "B":[1,2,3]}, {"A": "Hallo", "B":[1,2,3]}, true],
        [{"A": "Hallo", "B":[1,2,3]}, {"A": "Hallo", "B":[1,2,4]}, false],
        [{"A": "Hallo", "B":{"X":[1,2,3], "Y": [4,5]}}, {"A": "Hallo", "B":{"X":[1,2,3], "Y": [4,5]}}, true],
        [{"A": "Hallo", "B":{"X":[1,2,3], "Y": [4,5]}}, {"A": "Hallo", "B":{"X":[1,2,3], "Y": [44,5]}}, false],
    ]

    for (let t of test) {
        testEqual(IsEqual(t[0], t[1]), t[2],fname)}

    let test1 = [
        [[[1,1],2,3],[1,2,3],[1,2,3]],
        [[1,2,3],[1,2,3],[1,2,3]],
    ]
    let test2 = [
        [[[1,1],2,3],[1,2,3],[1,2,3]],
        [[1,2,3],[1,2,3],[1,2,3]],
    ]
    let max_iterations = 4

    testEqual(IsEqual(test1, test2, max_iterations), false, fname)
}

function test_Basis_typOf() {
    let fname = arguments.callee.name;
    
    let test = [
        [[1, 2, 3],'list'],
        [{ key: 'value' },'dict'],
        ['Hello, World!','str'],
        [42,'int'],
        [true,'bool'],
    ]

    for (let t of test) {
        testEqual(typOf(t[0]), t[1], fname)}
}
function test_Basis_byVal() {
    let fname = arguments.callee.name;
    liste = ["Super", "Mario", "Land"]
    listeA = _byVal(liste)
    listeB = liste

    liste[1] = "Sonic"
    testEqualList(listeA, ["Super", "Mario", "Land"], fname)
    testEqualList(listeB, ["Super", "Sonic", "Land"], fname)

    liste = ["Super", "Mario", "Land"]
    liste = [liste, liste, liste]
    listeA = _byVal(liste)
    listeB = liste

    liste[1][1] = "Sonic"
    testEqualList(listeA, [["Super", "Mario", "Land"], ["Super", "Mario", "Land"], ["Super", "Mario", "Land"]], fname)
    testEqualList(listeB, [["Super", "Sonic", "Land"], ["Super", "Sonic", "Land"], ["Super", "Sonic", "Land"]], fname)


    dicct = {"A": ["Super", "Mario", "Land"], "B":[1,2,3]}
    dicctA = _byVal(dicct)
    dicctB = dicct

    dicct["A"] = "Wolf"
    testEqualDict(dicctA, {"A": ["Super", "Mario", "Land"], "B": [1,2,3]}, fname)
    testEqualDict(dicctB, {"A": "Wolf", "B": [1,2,3]}, fname)
    return 0
}

function test_Basis_RetStringBetween() {
    let fname = arguments.callee.name;
    text = "R:1029C:23H:header"

    testEqual(RetStringBetween(text, "R:", "C:"), "1029", fname)
    testEqual(RetStringBetween(text, "R:", ""), "1029C:23H:header", fname)
    testEqual(RetStringBetween(text, "H:", ""), "header", fname)
}

function test_Basis_FileNameFromPath() {
    let fname = arguments.callee.name;

    text = "file:///C:/A/B/World/FileName.pdf"
    testEqual(FileNameFromPath(text), "FileName.pdf", fname)
    text = "file:///C:/A/B/World\\FileName.pdf"
    testEqual(FileNameFromPath(text), "FileName.pdf", fname)
}


// ################################################################
// rest                                                           #
// ################################################################

function toggle(val, pair) {
    if (val != pair[0]) {
        return pair[0]}
    return pair[1]
}

// ################################################################
// DOM Elements                                                   #
// ################################################################

function DIV(divID) {
    return document.getElementById(divID)
}

function Append_TextArea(div, cfg = {}) {
    document.getElementById(div).appendChild(TextArea(cfg))
}

function TextArea({
    id = "", 
    cols = 50, 
    rows = 5, 
    classList = [],
    value = ""
}) {
    let input = document.createElement('textarea'); 
    input.cols = cols
    input.rows = rows
    input.id = id
    input.readOnly = false
    input.value = value
    if (!IsEmptyList(classList)) {
        for (clas of classList) {
            input.classList.add(clas)}
    }
    return input
}

//MOHI

function Bold(text) {
    let b = document.createElement('b');
    b.textContent = text;
    return b
}


function A_HREF({
    id = "", 
    href = "",
    target = "",
    classList = [],
    text = ""
}) {
    let a = document.createElement('a');
    a.id = id;
    a.href = href;
    a.target = target;
    a.textContent = text;
    if (!IsEmptyList(classList)) {
        for (clas of classList) {
            input.classList.add(clas)}
    }
    return a;
}


// ################################################################
// Dom Structure Manipulation                                     #
// ################################################################

function RemoveDIV(divID) {
    let div  = document.getElementById(divID);
    if (div != undefined) {
        div.remove()}
}


// ################################################################
// Dom Elements  Manipulation                                     #
// ################################################################

function AutoHeight(divID) {
    if (document.getElementById(divID) != null) {
        document.getElementById(divID).style.height = (document.getElementById(divID).scrollHeight)+"px"}
    }

// ################################################################
// Dom Information                                                #
// ################################################################

function IsThereDiv(divID) {{
        return document.getElementById(divID) !== null;
      }
}
function IsObject(variable) {
    return typeof variable === 'object' && variable !== null && !Array.isArray(variable);
  }

function IsString(variable) {
    return typeof variable === 'string';
  }

function IsUndefined(variable) {
    return typeof variable === 'undefined';
  }

function IsNotUndefined(variable) {
    return !IsUndefined(variable)
  }

function IsBetween(number, a, b, incl = true) {
  if (incl) {
    if (number >=a && number <=b) {
      return true}
  } else {
    if (number >a && number <b) {
      return true}
  }
  return false
}

function IsEmptyList(variable) {
    return Array.isArray(variable) && variable.length == 0;
}
const CLS_SVG_APPLYFORTAGS = ["div", "a", "label"]
const CLS_SVG_VALID_NAMES = {
    "SquareArrowDown": "mySVG-SqAwDwn",
    "SquareArrowDownWithBottomLine": "mySVG-SqAwDwnBmLine",
    "A":  "mySVG-FileAwUp",
    "B": "mySVG-FileAwDown",
    "X": "mySVG-X"
}
const CLS_SVG_REPLACE = {
    "mySVG-SqAwDwnBmLine": '<svg width="16" height="16" fill="currentColor" class="bi bi-download" viewBox="0 0 16 16">\
    <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>\
    <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>\
    </svg>',

    // "mySVG-SqAwDwn": '<svg width="20" height="20" fill="currentColor" class="bi bi-save m-1" viewBox="0 0 16 16"> \
    // <path d="M2 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H9.5a1 1 0 0 0-1 1v7.293l2.646-2.647a.5.5 0 0 1 .708.708l-3.5 \
    // 3.5a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L7.5 9.293V2a2 2 0 0 1 2-2H14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h2.5a.5.5 0 0 1 0 1H2z"/> \
    // </svg>',

    "mySVG-SqAwDwn": '<svg width="20" height="20" fill="currentColor" class="m-1" viewBox="0 0 16 16"> \
    <path d="M2 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H9.5a1 1 0 0 0-1 1v7.293l2.646-2.647a.5.5 0 0 1 .708.708l-3.5 \
    3.5a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L7.5 9.293V2a2 2 0 0 1 2-2H14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h2.5a.5.5 0 0 1 0 1H2z"/> \
    </svg>',

    "mySVG-FileAwUp": '<svg width="25" height="25" fill="currentColor" class="bi bi-file-earmark-arrow-up-fill" viewBox="0 0 16 16"> \
    <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zM6.354 9.854a.5.5 0 0 1-.708-.708l2-2a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 8.707V12.5a.5.5 0 0 1-1 0V8.707L6.354 9.854z"/> \
    </svg>',

    "mySVG-FileAwDown": '<svg width="25" height="25" fill="currentColor" class="bi bi-file-earmark-arrow-down-fill" viewBox="0 0 16 16"> \
    <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zm-1 4v3.793l1.146-1.147a.5.5 0 0 1 .708.708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 0 1 .708-.708L7.5 11.293V7.5a.5.5 0 0 1 1 0z"/> \
    </svg>',

    // "mySVG-X": '<svg width="16" height="16" fill="currentColor" class="bi bi-bag-x" viewBox="0 0 16 16"> \
    // <path fill-rule="evenodd" d="M6.146 8.146a.5.5 0 0 1 .708 0L8 9.293l1.146-1.147a.5.5 0 1 1 .708.708L8.707 10l1.147 1.146a.5.5 0 0 1-.708.708L8 10.707l-1.146 1.147a.5.5 0 0 1-.708-.708L7.293 10 6.146 8.854a.5.5 0 0 1 0-.708"/> \
    // </svg>'

    "mySVG-X": '<svg width="20" height="20" fill="currentColor" class="m-1" viewBox="2 2 18 18">\
    <line x1="4" y1="4" x2="16" y2="16" stroke="currentColor" stroke-width="2"/>\
    <line x1="4" y1="16" x2="16" y2="4" stroke="currentColor" stroke-width="2"/>\
    </svg>'
}

dictSVG = {
    'pdf-img': '<svg id="pdf-img" width="100" height="125" viewBox="0 0 80 100" fill="none"> \
            <path d="M 10 0 \
            L 70 0 Q 80 0 80 10 \
            L 80 90 Q 80 100 70 100 \
            L 10 100 Q 0 100 0 90 \
            L 0 10 Q 0 0 10 0" fill="#E2574C"></path> \
            <path d="M 45 0 \
            L 70 0 Q 80 0 80 10 \
            L 80 35 \
            Z" fill="white"></path> \
            <path d="M 45 0 \
            L 80 35 \
            L 55 35 Q 45 35 45 25 \
            Z" fill="#B53629"></path> \
            <text x="8" y="25" fill="white" font-size="20">pdf</text> \
            <text x="5" y="80" fill="black" font-size="10"></text> \
            </svg>',
    'pdf-icon': '<svg id="pdf-icon" width="16" height="20" viewBox="0 0 16 20" fill="none"> \
        <path d="M 2 0 \
        L 14 0 Q 16 0 16 2 \
        L 16 18 Q 16 20 14 20 \
        L 2 20 Q 0 20 0 18 \
        L 0 2 Q 0 0 2 0" fill="#E2574C"></path> \
        <text x="1" y="12" fill="white" font-size="9">pdf</text> \
        </svg>'
        }

class clsSVG {
/**
 * Insert Creates SVG icons based on SVG class
 */
    constructor() {
        // this.CreateSVGs_FromDivClasses()
    }




    Get_SVG(key, idpostfix, height = null, width = null, subtext = "") {
        let svg = ""; let re = ""; let place = ""
        if (key in dictSVG) {
            svg = dictSVG[key]
            svg = svg.replace('" width', '-' + idpostfix + '" width')
            if (height != null) {
                re = 'height="' + RetStringBetween(svg, 'height="', '"') + '"'
                place = 'height="' + height + '"'
                svg = svg.replace(re, place)}
            if (width != null) {
                re = 'width="' + RetStringBetween(svg, 'width="', '"') + '"'
                place = 'width="' + width + '"'
                svg = svg.replace(re, place)}
            if (subtext != "") {
                re = 'font-size="10">' + RetStringBetween(svg, 'font-size="10">', '</text>') + '</text>'
                place = 'font-size="10">' + subtext + '</text>'
                svg = svg.replace(re, place)}
        }
        return svg
    } 

    CreateSVGs_FromDivClasses() {
        var Cls_SVG_ValidTags = Object.keys(CLS_SVG_REPLACE)
        let listDIVS = []
        // get all divs
        for (let tag of CLS_SVG_APPLYFORTAGS) {
            let pageDIVs = document.getElementsByTagName(tag)
            for (let div of pageDIVs) {
                listDIVS.push(div)
            }
        }
        
        // loop all divs->loop all classes
        for (let div of listDIVS) {
            for (let cls of div.classList)
                if (Cls_SVG_ValidTags.includes(cls)) {
                    div.innerHTML = CLS_SVG_REPLACE[cls] + div.innerHTML
                    // if (cls == "mySVG-SqAwDwnBmLine") {
                    //     div.innerHTML = CLS_SVG_REPLACE[cls] + div.innerHTML
                    // }
                }
        }
    }

    CreateSVG_FromDivID(divID, SVGName) {
        if (Object.keys(CLS_SVG_VALID_NAMES).includes(SVGName)) {
            let div = document.getElementById(divID);   
            div.innerHTML = CLS_SVG_REPLACE[CLS_SVG_VALID_NAMES[SVGName]] + div.innerHTML
        }
    }
}

// ######################################################
// MarkDown Functions                                   #
// ######################################################

function MyMarkDowntoSVG(markupText) {
    if (typOf(markupText) != 'str') {return markupText}
    
    htmlText = markupText
    patterns = _MyMarkDowntoSVG_Patterns(markupText)
    for (pattern of patterns) {
        replaceText = _MyMarkDowntoSVG_Replacement(pattern)
        htmlText = htmlText.replace(pattern, replaceText)
    }

    return htmlText;
    }

    function _MyMarkDowntoSVG_Replacement(pattern) {
        SVG = new clsSVG()
        let typ = _MyMarkDowntoSVG_PatternsType(pattern)
        let filetyp = _MyMarkDowntoSVG_PatternsFileType(pattern)
        var p = RetStringBetween(pattern, "::", "]")

        let ret
        ret = _MyMarkDowntoSVG_Replacement2(typ, filetyp, p)
        return ret
    }   
        function _MyMarkDowntoSVG_Replacement2(typ, filetyp, p2) {
            subtext = FileNameFromPath(RetStringBetween(p2, "::", "]"))
            subtext = RetStringBetween(subtext, "", ".pdf")
            if (typ == 'img') {
                subtext = ShortenDotDotDot(subtext)}
            let key = filetyp + '-' + typ
            svg = SVG.Get_SVG(key, subtext, null, null, subtext)
            
            let ret = ""
            if (typ == 'img') {
                ret = '<a href="' + p2 + '" target="#">' + svg + '</a>'}
            if (typ == 'icon') {
                ret = svg + ' <a href="' + p2 + '" target="#">' + subtext + '</a>'}
            return ret
        }

    function _MyMarkDowntoSVG_Patterns(markupText) {
        patsIMG = PatternsFound(markupText, ["[(img)", "::", "]"])  
        patsICON = PatternsFound(markupText, ["[(icon)", "::", "]"])  
        return patsIMG.concat(patsICON)
    }

    function _MyMarkDowntoSVG_PatternsType(pattern) {
        if (pattern.includes('[(img)')) {
            return 'img'}
        if (pattern.includes('[(icon)')) {
            return 'icon'}
        assert(false)
    }

    function _MyMarkDowntoSVG_PatternsFileType(pattern) {
        if (pattern.includes(')pdf::')) {
            return 'pdf'}
        assert(false)
    }

// svg -> markup
function SVGtoMyMarkdown(htmlText) {
    let ret = htmlText
    svgs = DOMElementsFromString(htmlText, 'svg')
    for (let svg of svgs) {
        ret = _SVGtoMyMarkdown_Loop(ret, svg)}
    
    ret = HTMLtoMyMarkdown(ret)

    return ret
    }

function  _SVGtoMyMarkdown_Loop(htmlText, svg) {
        let svgText = svg.outerHTML
    
        if (svg.id.includes('pdf-img')) {
            htmlText = htmlText.replace(svgText, '(img)pdf') }
        if (svg.id.includes('pdf-icon')) {
            htmlText = htmlText.replace(svgText + ' ', '')
            let linkName = RetStringBetween(svg.id, 'pdf-icon-', '')
            if (linkName.length > 3) {
                htmlText = htmlText.replace('>' + linkName + '</a>', '>(icon)pdf</a>')}
        }
        return htmlText
}

// ###############################################################################
// Basis   Text Functions                                                        #
// ###############################################################################

function RetStringBetween(text, fromStr, toStr = "", ignoreBlankAtBorders = false) {
    /**
     * Returns the String between two  strings.
     * "" / empty strings are interpreted as open end / take rest of string
     * strings not found in text are interpreted as "" / empty strings
     * 
     */

    var [idx1, idx2, len1, len2] = _RetIdxFromTextInString(text, fromStr, toStr, ignoreBlankAtBorders)

    if (idx2 > idx1) {
        return text.substring(idx1+len1, idx2);}
    else {
        return text.substring(idx1+len1)}
}

function RetStringOutside(text, fromStr, toStr) {
    /**
     * Returns the String except the text between two  strings.
     * "" / empty strings are interpreted as "remove rest of string"
     * strings not found in text are interpreted as "" / empty strings (=identical behaviour)
     * 
     */

    var [idx1, idx2, len1, len2] = _RetIdxFromTextInString(text, fromStr, toStr)

    // fromStr = "" and toStr was found at start:
    if (idx1 == 0 && idx2 == 0 && len2 >0) {
        return text.substring(idx2 + len2)
    }

    if (idx2 > idx1) {
        return text.substring(0, idx1) + text.substring(idx2 + len2)}
    else {
        return text.substring(0, idx1)}
}

function _RetIdxFromTextInString(text, strA, strB, ignoreBlankAtBorders){
    /**
     * Returns the indexes and length of the search string given
     * if a string was not found, returns (idx=0 and len=0) => identical behaviour as if search string was str = ""
     * if a string was found at start returns (idx = 0, len = <3>)
     * 
     */
    var idx1 = text.indexOf(strA);
    if (idx1 == -1) {strA=""; tmp1 = -1}   // if u dont find the string, act if it was an empty string
    idx1 = text.indexOf(strA);
    
    if (ignoreBlankAtBorders && text.indexOf(" " + strB)>-1) {
        strB = " " + strB
    }
    var idx2 = text.indexOf(strB, fromIndex = idx1);
    if (idx2 == -1) {strB=""; tmp2 = -1} // if u dont find the string, act if it was an empty string
    idx2 = text.indexOf(strB, fromIndex = idx1);
    l1 = strA.length
    l2 = strB.length
    return [idx1, idx2, l1, l2]
}

function FileNameFromPath(path) {
    let idxR1 = path.lastIndexOf("/")
    let idxR2 = path.lastIndexOf("\\")
    let idx = Math.max(idxR1, idxR2)

    return path.slice(idx+1)
}

function rgbText(a,b,c) {
    return "rgb(" + a + "," + b + "," + c + ")"
}

function myTrim(input) {
        return input.replace(/ /g, '');
    }

function myReplace(val,re,place) {
    let value = val
    if (value.includes(re)) {
        value = value.replace(new RegExp(re, "g") , place)
    }
    return value
}

function ShortenDotDotDot(text, lenn = 12){
    let len = text.length; let len2 = len/2
    let ret = text
    if (len > lenn) {
        ret = text.substring(0, len2) + "..." + text.substring(len-len2,len)}
    return ret
}

function ChangeLastChar(inputString, newChar) {
    if (inputString.length == 0) {
        return ''}
    if (newChar.length != 1) {
        return inputString}

    let charArray = inputString.split('');
    charArray[charArray.length - 1] = newChar;
    let resultString = charArray.join('');

    return resultString;
  }


// ################################################################
// test                                                           #
// ################################################################

function test_TextFunctions() {
    test_Basis_RetStringBetween()   
    test_Basis_FileNameFromPath() 
    test_Basis_myReplace() 

    return 0 // 32 assertions in this file (and should all be catched)
}



function test_Basis_RetStringBetween() {
    let fname = arguments.callee.name;
    text = "R:1029C:23H:header"

    testEqual(RetStringBetween(text, "R:", "C:"), "1029", fname)
    testEqual(RetStringBetween(text, "R:", ""), "1029C:23H:header", fname)
    testEqual(RetStringBetween(text, "H:", ""), "header", fname)
}

function test_Basis_FileNameFromPath() {
    let fname = arguments.callee.name;

    text = "file:///C:/A/B/World/FileName.pdf"
    testEqual(FileNameFromPath(text), "FileName.pdf", fname)
    text = "file:///C:/A/B/World\\FileName.pdf"
    testEqual(FileNameFromPath(text), "FileName.pdf", fname)
}

function test_Basis_myReplace() {
    let fname = arguments.callee.name;

    textRe = "Lorem Ipsum Apsum Ma"
    textPLACE = "Lorem IpSum ApSum Ma"
    testEqual(myReplace(textRe, "s", "S"), textPLACE, fname)
}


function PatternsFound(text, pattern = ["[", ":", "]"], ignore1 = []) {
    assert(typOf(text) == "str", "a not str")
    assert(typOf(pattern) == "list", "b not list")
    assert(IsBetween(pattern.length, 2,3), "b not length 2 or 3")

    if (pattern.length == 2) {
        // not implemented
    }
    if (pattern.length == 3) {
        return PatternsFound3(text, pattern, ignore1)
    }
}

function PatternsFound3(text, p3 = ["[", ":", "]"], ignore1 = []) {
    let ret = []; let tmp = ""
    let startIndex = 0; let pIndex = [-1, -1, -1]
    
    // find p indexes
    while (startIndex < text.length) {
        pIndex[0] = text.indexOf(p3[0], startIndex)
        if (pIndex[0] == -1) {return ret}
        for (i = 1; i < p3.length; i++) {
            pIndex[i] = text.indexOf(p3[i], pIndex[i-1])
            if (pIndex[i] == -1) {return ret}
        }
      
        // Extract the pattern and push it into the occurrences array
        tmp = text.slice(pIndex[0], pIndex[pIndex.length-1] + 1);
        if (ignore1.length > 0) {
            for (ignore of ignore1) {
                if (!tmp.startsWith(ignore1)) {
                    ret.push(tmp);}
            }
        } else {
            ret.push(tmp) }
        startIndex = pIndex[pIndex.length-1] + 1;
    }
    return ret;
  }

// markup -> html
function MyMarkDowntoHTML(markupText, ignore1 = []) {
    if (typOf(markupText) != 'str') {
        return markupText}

    // replace [Text::Link] -> <a href="Link" ...>
    pats = PatternsFound(markupText, ["[", "::", "]"], ignore1)
    htmlText = markupText; var p1; var p2; var href
    for (pat of pats) {
        p1 = RetStringBetween(pat, "[", "::")
        p2 = RetStringBetween(pat, "::", "]")
        href = '<a href="' + p2 + '" target="#">' + p1 + '</a>'
        htmlText = htmlText.replace(pat, href)
    }
    // repalce /n -> <br>
    htmlText = htmlText.replace(new RegExp('\n', "g") , '<br>')

    htmlText = _replaceMultipleSpacesWithNbsp(htmlText)
    htmlText = _replaceBracketWitchCheckbox(htmlText)
    return htmlText;
    }

// html -> markup
function HTMLtoMyMarkdown(htmlText) {
    htmlText = htmlText.replace('target="#"', '')
    var anchorRegex = /<a\s+(?:[^>]*?\s+)?href=(["'])(.*?)\1[^>]*?>(.*?)<\/a>/g;
    var markupText = htmlText.replace(anchorRegex, '[$3::$2]');
    markupText = markupText.replace(new RegExp('<br>', "g") , '\n')
    markupText = _replaceNbspWithSpaces(markupText)
    markupText = _replaceCheckboxWithBrackets(markupText)
    return markupText;
    }


function _replaceMultipleSpacesWithNbsp(text) {
    return text.replace(/ {2,}/g, function(match) {
        return '&nbsp;'.repeat(match.length);
    });
    }

function _replaceNbspWithSpaces(text) {
    return text.replace(/&nbsp;+/g, function(match) {
        return ' '.repeat(match.length / 6); // 6 is the length of '&nbsp;'
    });
    }

function _replaceBracketWitchCheckbox(text) {
    text = text.replace(/\[ \]/g, '<input type="checkbox">')
    return text.replace(/\[x\]/g, '<input type="checkbox" checked="">')
}

function _replaceCheckboxWithBrackets(text) {
    text = text.replace(/<input type="checkbox">/g, '[ ]')
    return text.replace(/<input type="checkbox" checked="">/g, '[x]')
}

    // function parseMarkup(markupText) {
    //     if (typOf(markupText) != 'str') {
    //         return markupText}
    
    //     var linkRegex = /\[([^\]]+)::([^\]]+)\]/g;
    //     var htmlText = markupText.replace(linkRegex, '<a href="$2" target="#">$1</a>');
    //     // \n -> <br>
    //     htmlText = htmlText.replace(new RegExp('\n', "g") , '<br>')
    //     return htmlText;
    //     }
// ################################################################
// Prototype extentions                                           #
// ################################################################

// from https://stackoverflow.com/questions/6120931/how-to-count-certain-elements-in-array
Object.defineProperties(Array.prototype, {
    count: {
        value: function(query) {
            /* 
               Counts number of occurrences of query in array, an integer >= 0 
               Uses the javascript == notion of equality.
            */
            var count = 0;
            for(let i=0; i<this.length; i++)
                if (this[i]==query)
                    count++;
            return count;
        }
    }
});


Object.defineProperties(Array.prototype, {
    remove: {
        value: function(element) {
                let idx = this.indexOf(element);
                this.splice(idx, 1)
        }
    }
});

Object.defineProperties(Array.prototype, {
    removeAll: {
        value: function(element) {
                let n = this.count(element)
                for (let i = 0; i<n;i++) {
                    this.removeX(element)}
        }
    }
});

Object.defineProperties(Array.prototype, {
    removeX: {
        value: function(element) {
            if (this.includes(element)) {
                this.remove(element)
            }
        }
    }
});


Object.defineProperties(Array.prototype, {
    toggle: {
        value: function(element) {
            if (this.includes(element)) {
                this.remove(element)}
            else {
                this.push(element)}
            }
        }
});

Object.defineProperties(Array.prototype, {
    pushX: {
        value: function(element) {
            if (!this.includes(element)) {
                this.push(element)}
            }
        }
});


Object.defineProperties(Array.prototype, {
    replaceIfEmpty: {
        value: function(element) {
            if (Array.isArray(element)) {
                if (this.length === 0) {
                    for (let e of element) {
                        this.push(e)
                    }}
                }
            }
        }
});
