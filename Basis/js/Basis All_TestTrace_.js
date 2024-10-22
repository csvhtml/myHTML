const BASIS = {
	assert: function(condition, message) {return assert(condition, message)},
	NoBlanksInList: function(liste) {return NoBlanksInList(liste)},
	NoBlanks: function(text) {return NoBlanks(text)},
	byVal: function(data) {return byVal(data)},
	ValidChars: function(validChars, text) {return ValidChars(validChars, text)},
	typOf: function(variable, extendedInfo = false) {return typOf(variable, extendedInfo)},
	ListDepth: function(ListVariable) {return ListDepth(ListVariable)},
	NtoX: function(n, x) {return NtoX(n, x)},
	maxx: function(a, b) {return maxx(a, b)},
	minn: function(a, b) {return minn(a, b)},
	wenn: function(condition, trueValue, falseValue) {return wenn(condition, trueValue, falseValue)},
	IsEqual: function(a,b, max_iterations = 100) {return IsEqual(a,b, max_iterations)},
	IsListEqualSize: function(a,b, flag = false) {return IsListEqualSize(a,b, flag)},
	ElementInArrayN: function(array, element) {return ElementInArrayN(array, element)},
	sortByLeadingNumber: function(textList) {return sortByLeadingNumber(textList)},
	toggle: function(val, pair) {return toggle(val, pair)},
	DIV: function(divID) {return DIV(divID)},
	Append_TextArea: function(div, cfg = {}) {return Append_TextArea(div, cfg)},
	TextArea: function(dicct = {}) {return TextArea(dicct)},
	Bold: function(text) {return Bold(text)},
	A_HREF: function(dicct = {}) {return A_HREF(dicct)},
	NewDiv: function(config) {return NewDiv(config)},
	RemoveDIV: function(divID) {return RemoveDIV(divID)},
	AutoHeight: function(divID) {return AutoHeight(divID)},
	IsThereDiv: function(divID) {return IsThereDiv(divID)},
	ListOfDivs: function(TagsL) {return ListOfDivs(TagsL)},
	HTML_Table: function(config) {return HTML_Table(config)},
	HTMLTable_FromConfig: function(config) {return HTMLTable_FromConfig(config)},
	HTMLTable_FromMarkdown: function(markdownString) {return HTMLTable_FromMarkdown(markdownString)},
	HTMLTable_FullConfig: function(config) {return HTMLTable_FullConfig(config)},
	HTMLTable_TableRowsCols: function(p) {return HTMLTable_TableRowsCols(p)},
	HTMLTable_DefaultVal: function(key, nCols, nRows) {return HTMLTable_DefaultVal(key, nCols, nRows)},
	HTMLTable_Row: function(config) {return HTMLTable_Row(config)},
	IsObject: function(variable) {return IsObject(variable)},
	IsString: function(variable) {return IsString(variable)},
	IsUndefined: function(variables) {return IsUndefined(variables)},
	IsPartlyUndefined: function(variables) {return IsPartlyUndefined(variables)},
	IsNotUndefined: function(variable) {return IsNotUndefined(variable)},
	IsEmptyList: function(variable) {return IsEmptyList(variable)},
	IsString1: function(variable) {return IsString1(variable)},
	RetStringBetween: function(text, fromStr, toStr) {return RetStringBetween(text, fromStr, toStr)},
	RetStringOutside: function(text, fromStr, toStr) {return RetStringOutside(text, fromStr, toStr)},
	FileNameFromPath: function(path) {return FileNameFromPath(path)},
	rgbText: function(a,b,c) {return rgbText(a,b,c)},
	myTrim: function(input) {return myTrim(input)},
	ShortenDotDotDot: function(text, lenn = 12) {return ShortenDotDotDot(text, lenn)},
	ChangeLastChar: function(inputString, newChar) {return ChangeLastChar(inputString, newChar)},
	PatternsInText: function(text, patternL) {return PatternsInText(text, patternL)},
	MyMarkDowntoHTML: function(markupText) {return MyMarkDowntoHTML(markupText)},
	HTMLtoMyMarkdown: function(htmlText) {return HTMLtoMyMarkdown(htmlText)},
	DOMElementsFromString: function(htmlString, tag) {return DOMElementsFromString(htmlString, tag)},
};


// ################################################################
// Assert                                                         #
// ################################################################

function assert(condition, message) {
	TraceFunctionCalls.pushX(arguments.callee.name)
    if (!condition) {
        if (IsString1(message)) {
            throw new Error(message);
        } else {
            throw new Error}
    }
}

// ################################################################
// Useful functions                                               #
// ################################################################

function NoBlanksInList(liste) {
	TraceFunctionCalls.pushX(arguments.callee.name)
    let ret = []
    for (ele of liste) {
        ret.push(NoBlanks(ele))}

    return ret
}

function NoBlanks(text) {
	TraceFunctionCalls.pushX(arguments.callee.name)
    return text.replace(/ /g, "")
}

function byVal(data) {
	TraceFunctionCalls.pushX(arguments.callee.name)
    // Creates a hard copy of a variable (instead of just createing a reference in case of list and dictioaries). 
    // It mimics the 'byVal' operater in VBA, hence the name
    
    if ( ["bool", "str", "int"].indexOf(typOf(data)) >-1) {
        return data} // as they are 'hard copied' by default

    if (typOf(data) == "list") {
        let ret = []
        for (let element of data) {
            ret.push(byVal(element))}
        return ret}
    
    if (typOf(data) == "dict") { 
        let ret = { }
        let keys= Object.keys(data)
        for (let key of keys) {
            ret[key] = byVal(data[key])}
        return ret}

    return data
}

function ValidChars(validChars, text) {
	TraceFunctionCalls.pushX(arguments.callee.name)
    for (char of text) {
        if (!validChars.includes(char)) {
            return false}
    }
    return true
}

function typOf(variable, extendedInfo = false) {
    if (Array.isArray(variable)) {
        if (extendedInfo) {
            return 'list' + '-' + String(ListDepth(variable)) + 'D'}
        return 'list'} // javascript 'Array'
    if (typeof variable === 'object' && variable !== null) {
        return 'dict'} // javascript 'Object'
    if (typeof variable === 'string') {
        return 'str'}
    if (typeof variable === 'number') {
        return 'int'}
    if (typeof variable === 'boolean') {
        return 'bool'}
    if (variable === null) {
        return 'null'}
    if (variable === undefined) {
        return 'undefined'}

    assert(false, String(variable))
}

function ListDepth(ListVariable) {
	TraceFunctionCalls.pushX(arguments.callee.name)
    if (typOf(ListVariable) != 'list') {return 0}

    let maxDepth = 0;
    for (let element of ListVariable) {
        maxDepth = maxx(maxDepth, ListDepth(element));}
    return maxDepth + 1
}

function NtoX(n, x) {
	TraceFunctionCalls.pushX(arguments.callee.name)
    let ret = [];
    for (let i = n; i <= x; i++) {
        ret.push(i);}
    return ret;
  }

function maxx(a, b) {
	TraceFunctionCalls.pushX(arguments.callee.name)
    return (a > b) ? a : b;
}

function minn(a, b) {
	TraceFunctionCalls.pushX(arguments.callee.name)
    return (a < b) ? a : b;
}

function wenn(condition, trueValue, falseValue) {
	TraceFunctionCalls.pushX(arguments.callee.name)
    return condition ? trueValue : falseValue;
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
            let result = false
            for (let i = 0; i<a.length;i++) {
                result = IsListEqualSize(a[i],b[i], true)
                if (result == false) {
                    return false}
            }
            return true
        }
    }

    if (flag && typOf(a) != "list" && typOf(b) != "list") {
            return true}

    return false
}

function ElementInArrayN(array, element) {
	TraceFunctionCalls.pushX(arguments.callee.name)
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

function sortByLeadingNumber(textList) {
	TraceFunctionCalls.pushX(arguments.callee.name)
    for (element of textList) {
        if (!ValidChars("0123456789", element.until(' '))) return textList}

    const compare = (a, b) => {
      // Extrahiere die Zahl aus jedem Text
      const numberA = Number(a.split(' ')[0]);
      const numberB = Number(b.split(' ')[0]);
      return numberA - numberB;
    };
  
    // Sortiere das Array mit der Vergleichsfunktion
    return textList.slice().sort(compare);
  }
// ################################################################
// rest                                                           #
// ################################################################

function toggle(val, pair) {
	TraceFunctionCalls.pushX(arguments.callee.name)
    if (val != pair[0]) {
        return pair[0]}
    return pair[1]
}

// ################################################################
// DOM Elements                                                   #
// ################################################################

function DIV(divID) {
	TraceFunctionCalls.pushX(arguments.callee.name)
    return document.getElementById(divID)
}

function Append_TextArea(div, cfg = {}) {
	TraceFunctionCalls.pushX(arguments.callee.name)
    document.getElementById(div).appendChild(TextArea(cfg))
}

function TextArea({
    id = "", 
    cols = 50, 
    rows = 5, 
    classList = [],
    value = ""
}) {
	TraceFunctionCalls.pushX(arguments.callee.name)
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

function Bold(text) {
	TraceFunctionCalls.pushX(arguments.callee.name)
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
	TraceFunctionCalls.pushX(arguments.callee.name)
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

function NewDiv(config) {
	TraceFunctionCalls.pushX(arguments.callee.name)
    let defaultConfig = {'type': 'div', 'id': 'id', 'innerHTML': '---'}
    let cfg = {...defaultConfig,...config}
    let ret = document.createElement(cfg['type'])
    ret.id = cfg['id']
    ret.innerHTML = cfg['innerHTML']

    return ret
}

// ################################################################
// Dom Structure Manipulation                                     #
// ################################################################

function RemoveDIV(divID) {
	TraceFunctionCalls.pushX(arguments.callee.name)
    let div  = document.getElementById(divID);
    if (div != undefined) {
        div.remove()}
}


// ################################################################
// Dom Elements  Manipulation                                     #
// ################################################################

function AutoHeight(divID) {
	TraceFunctionCalls.pushX(arguments.callee.name)
    if (document.getElementById(divID) != null) {
        document.getElementById(divID).style.height = (document.getElementById(divID).scrollHeight)+"px"}
    }

// ################################################################
// Dom Information                                                #
// ################################################################

function IsThereDiv(divID) {
	TraceFunctionCalls.pushX(arguments.callee.name)
        return document.getElementById(divID) !== null;
}

function ListOfDivs(TagsL) {
	TraceFunctionCalls.pushX(arguments.callee.name)
    if (TagsL === undefined) {return []}
    ret = []
    for (let tag of TagsL) {
        let pageDIVs = document.getElementsByTagName(tag)
        for (let div of pageDIVs) {
            ret.push(div)}
    }
    return ret
}
// ################################################################################
// # basisHTMLTable.js                                                            #
// ################################################################################

const BASIS_HTMLTABLE_CONFIG = {
    tableID: "",
    tableClass: "",
    tableStyle: "",  // "color: blue"

    theadID: "",
    theadClass: "",
    theadStyle: "",  // "color: blue"

    trhID: "",
    trhClass: "",

    // default config is 3 cols with 2 rows
    thsText: ["", "", ""],
    thsID:  ["", "", ""], 
    thsClass:  ["", "", ""], 
    thsStyle:  ["", "", ""],     // ["width:30%", "width:30%", "width:30%"]

    rowsID: ["", ""],
    rowsClass: ["", ""],
    rowsStyle: ["", ""],

    cellsText: [["", "", ""], ["", "", ""]],
    cellsID: [["", "", ""], ["", "", ""]],
    cellsClass: [["", "", ""], ["", "", ""]],
    cellsStyle: [["", "", ""], ["", "", ""]]
}

function HTML_Table(config) {
	TraceFunctionCalls.pushX(arguments.callee.name)
    let rows = 2; let cols = 3
    let table = _HTML_Table_Skeleton(rows, cols)
    
    if (!IsUndefined([config])) {
        // if defined, then cellsText must be defined
        table = _HTML_Table_Skeleton(config['cellsText'].Shape()[0], config['cellsText'].Shape()[1])
        table.mySetCells(config['cellsText'])}


    // if (!IsUndefined([config])) {
    //     let fullConfig = HTMLTable_FullConfig(config)
    //     _HTMLTable_ConfigAssert(fullConfig)
    // }

    return table;
}

function _HTML_Table_Skeleton(rows, cols) {
    let thead = document.createElement('thead')
    thead = _HTML_Table_Rows(thead, 'th', 1, cols)
    
    let tbody = document.createElement('tbody');
    tbody = _HTML_Table_Rows(tbody, 'td', rows, cols)

    let table = document.createElement('table')
    table.appendChild(thead)
    table.appendChild(tbody);

    return table;
}

function _HTML_Table_Rows(anchor, tx, Nrows, Ncols) {
    if (tx == 'th') assert(Nrows == 1)

    let row = document.createElement('tr')
    for (let r = 0; r < Nrows; r++) {
        row = document.createElement('tr')
        for (let i = 0; i<Ncols; i++) {
            row.appendChild(document.createElement(tx))}
        anchor.appendChild(row)
    }

    return anchor
}

function HTMLTable_FromConfig(config) {
	TraceFunctionCalls.pushX(arguments.callee.name)
    let fullConfig = HTMLTable_FullConfig(config)
    _HTMLTable_ConfigAssert(fullConfig)
    
    return _HTMLTable_FromConfigRaw(fullConfig)
}

function HTMLTable_FromMarkdown(markdownString) {
	TraceFunctionCalls.pushX(arguments.callee.name)
    let MHC = _ReturnMetaHeaderCells(markdownString); if (MHC==false) {return}
    let miniConfig = {
        tableID: MHC[0]["id"],
        tableClass: MHC[0]["class"],
        tableStyle: MHC[0]["style"],
        thsText: MHC[1],
        cellsText: MHC[2]
    }
    return HTMLTable_FromConfig(miniConfig)
}

function HTMLTable_FullConfig(config) {
	TraceFunctionCalls.pushX(arguments.callee.name)
    // will lead to wrong result: let fullConfig = { ...BASIS_HTMLTABLE_CONFIG, ...config }; 
    // because the dimension may not fit. The merge must be done manually
    if (IsUndefined([config])) return BASIS_HTMLTABLE_CONFIG

    let ret = {}
    let nRowsCols = HTMLTable_TableRowsCols(config); let nCols = nRowsCols[1]; let nRows = nRowsCols[0]
    
    for (let key in BASIS_HTMLTABLE_CONFIG) {
        if (key in config) {
            ret[key] = config[key]}
        else {
            ret[key] = HTMLTable_DefaultVal(key, nCols, nRows)}
        }
    
    return ret
}

function _HTMLTable_FromConfigRaw(cfg) {
    let Tag = function (key, val) {return _htmltable_Tag(key, val)}
    let Row = function (a) {return HTMLTable_Row(a)}
    let Body = function (a,b) {return _htmltable_Body(a,b)}
    let ret = ""
    ret += Tag('table', {id:cfg["tableID"], clas:cfg["tableClass"], style:cfg["tableStyle"]})
    ret += Tag('thead', {id:cfg["theadID"], clas:cfg["theadClass"], style:cfg["theadStyle"]})
    ret += Row({tx:"th", cells: cfg["thsText"], id:cfg["trhID"], clas:cfg["trhClass"], style:cfg["thStyle"],
                         ids:cfg["thsID"], classes:cfg["thsClass"], styles:cfg["thsStyle"]}).outerHTML
    ret += '</thead>';
    ret += Tag('tbody', {});
    ret += Body(cfg["cellsText"], cfg)  
    ret += '</tbody>';
    return ret + '</table>'
}


function _HTMLTable_ConfigAssert(cfg) {
    let nRowsCols = HTMLTable_TableRowsCols(cfg); 
    let lenC = nRowsCols[1]
    let lenR = nRowsCols[0]
    assert(cfg["thsID"].length == lenC, cfg["thsID"].length)
    assert(cfg["thsClass"].length == lenC, cfg["thsClass"].length || typOf(cfg["cellsClass"]) == 'str')
    assert(cfg["thsStyle"].length == lenC, cfg["thsStyle"].length)
    assert(cfg["rowsID"].length == lenR, cfg["rowsID"].length)
    assert(cfg["rowsClass"].length == lenR, cfg["rowsClass"].length || typOf(cfg["cellsClass"]) == 'str')
    assert(cfg["rowsStyle"].length == lenR, cfg["rowsStyle"].length)
    assert(IsListEqualSize(cfg["cellsID"],cfg["cellsText"]))
    assert(IsListEqualSize(cfg["cellsClass"],cfg["cellsText"]) || typOf(cfg["cellsClass"]) == 'str')
    assert(IsListEqualSize(cfg["cellsStyle"],cfg["cellsText"]))
    return true
}

function HTMLTable_TableRowsCols(p) {
	TraceFunctionCalls.pushX(arguments.callee.name)
    assert(p.keys().includes('cellsText'))

    let r = 0; let c = 0
    // if (!IsEqual(p['thsText'], [])) {
    //     assert(typOf(p['thsText'], true) == "list-1D")
    //     c = p['thsText'].length}

    if (!IsEqual(p['cellsText'], [])) {
        assert(typOf(p['cellsText'], true) == "list-2D")
        r = p['cellsText'].length 
        if (c == 0) {
            c = p['cellsText'][0].length}
    }

    return [r,c]
}

function HTMLTable_DefaultVal(key, nCols, nRows) {
	TraceFunctionCalls.pushX(arguments.callee.name)
    if (typOf(BASIS_HTMLTABLE_CONFIG[key]) == 'str') {
        return ""}
    if (typOf(BASIS_HTMLTABLE_CONFIG[key], true) == 'list-1D') {
        if (key.startsWith('rows')) {
            return Array(nRows).fill("")}
        if (key.startsWith('ths')) {
            return Array(nCols).fill("")}
        assert(false)}
    if (typOf(BASIS_HTMLTABLE_CONFIG[key], true) == 'list-2D') {
        return Array(nRows).fill(Array(nCols).fill(""))}
    
    assert(false)
}

let _ReturnMetaHeaderCells = function (markdownString) {
    let pa_meta = ""; let ret_meta = {}
    let table = myTrim(markdownString).split('\n'); table.removeAll("")
    if (_HasMetaInfo(table)) {
        pa_meta = table[0]
        pa_meta = RetStringBetween(pa_meta, "{", "}")
        pa_meta = pa_meta.split("|")
        for (let meta of pa_meta) {
            for (let para of ["id", "class", "style"]) {
                if (meta.split(":")[0] == para) {
                    ret_meta[para] = meta.split(":")[1]}
            }
        }
        table = table.slice(1,table.length)}

    let pa_header = table[0].split('|'); pa_header.removeAll("")
    let borderline = table[1].replace(/\|[-]+(?=\|)/g, '|---')  // |--------|  --> |---|
    let rowsStr = table.slice(2,table.length)
    let pa_rows = []
    for (let rowStr of rowsStr) {
        let row = rowStr.split('|'); row.removeAll("")
        pa_rows.push(row)}
    if (!_assertThis(borderline)) {return false}
    
    return [ret_meta, pa_header, pa_rows]
}

let _HasMetaInfo = function (table) {
    var regex = /^\{.*\}$/;
    return regex.test(table[0])}

let _assertThis = function (borderline)  {
    if (!borderline.includes("|---|")) {
        return false}
    return true}

// ############################################################################
// # HTML Table Buidling Blocks                                               #
// ############################################################################

function _htmltable_Tag(tag, {id="", clas="", style=""}) {
    let Tag_PropertyString = function (key, val) {return _htmltable_Tag_PropertyString(key, val)}
    let ret = "<" + tag
    ret += Tag_PropertyString("id", id)
    ret += Tag_PropertyString("class", clas)
    ret += Tag_PropertyString("style", style)
    ret += '>'

    if (tag == 'table') {
        let table = document.createElement('table')
        if (id!='') table.id = id
        if (clas!='') table.className = clas
        if (style!='') table.style = style
        assert(ret == table.outerHTML.until('</table>').trimPlus([': ', '; ']))
    }

    return ret}

function _htmltable_Body(rows, cfg) {
    let Row = function (a,b,c) {return HTMLTable_Row(a,b,c)}
    let ret = ""
    for (let i = 0;i<rows.length;i++) {
        if (IsEqual(cfg, {})) {
            ret += Row({tx:"td", cells:rows[i]}).outerHTML}
        else {
            ret += Row({tx:"td", cells:rows[i],
                id:cfg["rowsID"][i], clas:cfg["rowsClass"][i], style:cfg["rowsStyle"][i], 
                ids:cfg["cellsID"][i], classes:cfg["cellsClass"][i], styles:cfg["cellsStyle"][i]}).outerHTML}
    }
    return ret
}

function HTMLTable_Row(config) {
	TraceFunctionCalls.pushX(arguments.callee.name)
    let defaultConfig = {tx: '', cells: ['',''], id: "", clas: "", style: "", ids: ["",""], classes: ["",""], styles: ["",""]}
    let cfg = {...defaultConfig,...config}
    let DOM_tr = document.createElement('tr')
    DOM_tr = _DOM_Tags(DOM_tr, cfg['id'], cfg['clas'], cfg['style'])
    for (let i = 0; i< cfg['cells'].length; i++) {
        let DOM_cell = document.createElement(cfg['tx'])
        DOM_cell = _DOM_Tags(DOM_cell, cfg['ids'][i], cfg['classes'][i], cfg['styles'][i])
        DOM_cell.innerHTML = cfg['cells'][i]
        DOM_tr.appendChild(DOM_cell)}

    return DOM_tr}

function _htmltable_Tag_PropertyString(key, val) {
    let ret = ""
    if (val.length > 0) {
        // ret += key + '="' + val + '" '
        ret += " " + key + '="' + val + '"'
        }
    return ret}

function _DOM_Tags(DOM, id="", clas="", style="") {
    if (id != '') {
        DOM.id = id}
    if (clas != '') {
        let klassen = clas.split(' ')
        DOM.classList.replace(...klassen)}
    if (style != '') {
        DOM.style.cssText = style}

    return DOM
}
function IsObject(variable) {
	TraceFunctionCalls.pushX(arguments.callee.name)
    return typeof variable === 'object' && variable !== null && !Array.isArray(variable);
  }

function IsString(variable) {
	TraceFunctionCalls.pushX(arguments.callee.name)
    return typeof variable === 'string';
  }

function IsUndefined(variables) {
	TraceFunctionCalls.pushX(arguments.callee.name)
    assert(typOf(variables) == 'list')

    for (let v of variables) {
        if (typOf(v) != 'undefined') return false}
    return true
  }

function IsPartlyUndefined(variables) {
	TraceFunctionCalls.pushX(arguments.callee.name)
    assert(typOf(variables) == 'list')

    let undefinedSeen = false;
    let definedSeen = false;
    for (let v of variables) {
        if (typOf(v) != 'undefined') definedSeen = true
        if (typOf(v) == 'undefined') undefinedSeen = true}

    if (undefinedSeen && definedSeen) return true
    return false
  }

function IsNotUndefined(variable) {
	TraceFunctionCalls.pushX(arguments.callee.name)
    return !IsUndefined(variable)
  }

function IsEmptyList(variable) {
	TraceFunctionCalls.pushX(arguments.callee.name)
    return Array.isArray(variable) && variable.length == 0;
}

function IsString1(variable) {
	TraceFunctionCalls.pushX(arguments.callee.name)
  return IsString(variable) && variable.length > 0
}
const dictSVG = {
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
            </svg>',
            
    'folder-icon': '<svg id="folder-icon" width="16" height="20" viewBox="0 0 16 20" fill="none"> \
            <path fill="#FFA000" d="M 2 3  \
                    L 8 3  Q 10 3 10 5  \
                    L 10 8   \
                    L 0 8  \
                    L 0 5 Q 0 3 2 3"/> \
            <path fill="#FFCA28" d="M 2 6 \
                    L 22 6  Q 24 6 24 8 \
                    L 24 18 Q 24 20 22 20 \
                    L 2 20 Q 0 20 0 18 \
                    L 0 8 Q 0 6 2 6"/> \
                    </svg>',

    'a-x': '<svg id="a-x" width="20" height="20" fill="currentColor" class="m-1" viewBox="2 2 18 18">\
            <line x1="4" y1="4" x2="16" y2="16" stroke="currentColor" stroke-width="2"/>\
            <line x1="4" y1="16" x2="16" y2="4" stroke="currentColor" stroke-width="2"/>\
            </svg>',

    'a-ArrowDown': '<svg id="a-ArrowDown" width="20" height="20" fill="currentColor" class="m-1" viewBox="0 0 16 16"> \
            <path d="M2 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H9.5a1 1 0 0 0-1 1v7.293l2.646-2.647a.5.5 0 0 1 .708.708l-3.5 \
            3.5a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L7.5 9.293V2a2 2 0 0 1 2-2H14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h2.5a.5.5 0 0 1 0 1H2z"/> \
            </svg>',
        }

class clsSVG {
    constructor() {
        for (let key of Object.keys(dictSVG)) {
            this[key] = dictSVG[key]}
    }

    CreateAll_BasedOnDivClasses(tags) {
        let svgKeyClasses = Object.keys(this)
        svgKeyClasses.applyToItems(function (val) { return 'svg:' + val})
        let listDIVS = ListOfDivs(tags)

        for (let div of listDIVS) {
            for (let cls of div.classList)
                if (svgKeyClasses.includes(cls)) {
                    div.innerHTML = this[cls.after('svg:')] + div.innerHTML}
        }
    }

    Create_ToDIV(divID, SVGName) {
        if (Object.keys(this).includes(SVGName)) {
            let div = document.getElementById(divID); 
            div.innerHTML = this[SVGName] + div.innerHTML
        }
    }
}
// ###############################################################################
// Basis   Text Functions                                                        #
// ###############################################################################

function RetStringBetween(text, fromStr, toStr) {
	TraceFunctionCalls.pushX(arguments.callee.name)
    /**
     * Returns the String between two  strings.
     * "" / empty strings are interpreted as open end / take rest of string
     * strings not found in text are interpreted as "" / empty strings
     * 
     */
    if (IsUndefined([text, fromStr])) assert(false)
    if (toStr === undefined) toStr = ''
    
    if (toStr == '') return text.after(fromStr)

    var [idx1, idx2, len1, len2] = _RetIdxFromTextInString(text, fromStr, toStr)

    if (idx2 > idx1+len1-1) {
        return text.substring(idx1+len1, idx2);}
    else {
        return text.substring(idx1+len1)}
}

function RetStringOutside(text, fromStr, toStr) {
	TraceFunctionCalls.pushX(arguments.callee.name)
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

function _RetIdxFromTextInString(text, strA, strB){
    /**
     * Returns the indexes and length of the search string given
     * if a string was not found, returns (idx=0 and len=0) => identical behaviour as if search string was str = ""
     * if a string was found at start returns (idx = 0, len = <3>)
     * 
     */
    var idx1 = text.indexOf(strA);
    if (idx1 == -1) {strA=""; tmp1 = -1}   // if u dont find the string, act if it was an empty string
    idx1 = text.indexOf(strA);
    
    // if (ignoreBlankAtBorders && text.indexOf(" " + strB)>-1) {
    //     strB = " " + strB
    // }
    var idx2 = text.indexOf(strB, fromIndex = idx1 + strA.length);
    if (idx2 == -1) {strB=""; tmp2 = -1} // if u dont find the string, act if it was an empty string
    idx2 = text.indexOf(strB, fromIndex = idx1 + strA.length);
    l1 = strA.length
    l2 = strB.length
    return [idx1, idx2, l1, l2]
}

function FileNameFromPath(path) {
	TraceFunctionCalls.pushX(arguments.callee.name)
    let idxR1 = path.lastIndexOf("/")
    let idxR2 = path.lastIndexOf("\\")
    let idx = Math.max(idxR1, idxR2)

    return path.slice(idx+1)
}

function rgbText(a,b,c) {
	TraceFunctionCalls.pushX(arguments.callee.name)
    return "rgb(" + a + "," + b + "," + c + ")"
}

// obsolete: replacement is string.trimPlus
function myTrim(input) {
	TraceFunctionCalls.pushX(arguments.callee.name)
        return input.replace(/ /g, '');
    }

function ShortenDotDotDot(text, lenn = 12){
    let len = text.length; let len2 = len/2
    let ret = text
    if (len > lenn) {
	TraceFunctionCalls.pushX(arguments.callee.name)
        ret = text.substring(0, len2) + "..." + text.substring(len-len2,len)}
    return ret
}

function ChangeLastChar(inputString, newChar) {
	TraceFunctionCalls.pushX(arguments.callee.name)
    if (inputString.length == 0) {
        return ''}
    if (newChar.length != 1) {
        return inputString}

    let charArray = inputString.split('');
    charArray[charArray.length - 1] = newChar;
    let resultString = charArray.join('');

    return resultString;
  }
function PatternsInText(text, patternL) {
	TraceFunctionCalls.pushX(arguments.callee.name)
    if (text === undefined) return false;
    if (patternL === undefined) return false;
    assert(typOf(text) == "str")
    assert(typOf(patternL) == "list")
    assert(2 <= patternL.length && patternL.length <= 3)

    
    // paternL = ["[", "]"];
    if (patternL.length == 2) {
        return _PatternsFound2(text, patternL)
    }
    // paternL = ["[", ":", "]"];
    if (patternL.length == 3) {
        return _PatternsFound3(text, patternL)
    }
}

function _PatternsFound2(text, patternL) {
    let ret = []; let tmp = ""
    let startIndex = 0; let pIndex = [-1, -1]

    while (startIndex < text.length) {
        // find index 0
        pIndex[0] = text.indexOf(patternL[0], startIndex)
        if (pIndex[0] == -1) return ret
        // find index 1
        pIndex[1] = text.indexOf(patternL[1], pIndex[0])
        if (pIndex[1] == -1) return ret
        // Extract Pattern and Push
        ret.push(text.slice(pIndex[0], pIndex[1] + 1))

        startIndex = pIndex[1] + 1;}

    return ret
}

function _PatternsFound3(text, patternL) {
    let ret = []; let tmp = ""
    let startIndex = 0; let pIndex = [-1, -1, -1]
    
    while (startIndex < text.length) {
        // find index 0
        pIndex[0] = text.indexOf(patternL[0], startIndex); if (pIndex[0] == -1) return ret
        // find index 1
        pIndex[1] = text.indexOf(patternL[1], pIndex[0]); if (pIndex[1] == -1) return ret
        // find index 2 (again strarting from pIndex[0])
        pIndex[2] = text.indexOf(patternL[2], pIndex[0]); if (pIndex[1] == -1) return ret
        // skip if index 1 > index 2
        if (pIndex[1] > pIndex[2]) {
            startIndex = pIndex[0] + 1;
            continue}
        // Extract Pattern and Push
        ret.push(text.slice(pIndex[0], pIndex[2] + 1))

        startIndex = pIndex[2] + 1;}

    return ret;
  }
// ################################################################
// MarkDown   Config                                              #
// ################################################################

const CLASS_SVG_FOR_MARKDOWN = new clsSVG()

const CONFIG_SVG_FOR_MARKDOWN_REPLACE = [
    // ['Markdown String', svg string, key]
    ["[(SVG)pdf]", CLASS_SVG_FOR_MARKDOWN['pdf-img'], 'pdf-img'],
    ["[(svg)pdf]", CLASS_SVG_FOR_MARKDOWN['pdf-icon'], 'pdf-icon'],
    ["[(svg)folder]", CLASS_SVG_FOR_MARKDOWN['folder-icon'], 'folder-icon'],
]

const CONFIG_MYMARKDOWN_FEATURES_ACTIVE = {
    'new Line': true,
    'multi Space': true,
}

const CONFIG_MYMARKDOWN_PATTERN2_ACTIVE = {
    'Checkbox': true,
    'svg': true,
    'img': true
}

const CONFIG_MYMARKDOWN_PATTERN3_ACTIVE = {
    'Link': true,

}

// ################################################################
// MarkDown   -> HTML                                             #
// ################################################################

function MyMarkDowntoHTML(markupText) {
	TraceFunctionCalls.pushX(arguments.callee.name)
    assert(typOf(markupText) == 'str')

    let pats3 = PatternsInText(markupText, ["[", "::", "]"])
    let pats2 = PatternsInText(markupText, ["[", "]"]); pats2.removeItems(pats3)

    htmlText = _MyMarkDown_FeaturesWithoutBrackets_Apply(markupText)

    htmlText = _MyMarkDown_Patterns2_Apply(htmlText, pats2)

    htmlText = _MyMarkDown_Patterns3_Apply(htmlText, pats3)

    return htmlText;
    }


function _MyMarkDown_FeaturesWithoutBrackets_Apply(text) {
    let Features = CONFIG_MYMARKDOWN_FEATURES_ACTIVE

    if (Features['new Line']) {
        text = text.replace(new RegExp('\n', "g") , '<br>')}
    if (Features['multi Space']) {
        text = text.replace(/ {2,}/g, function(match) {return '&nbsp;'.repeat(match.length);});}

    return text
}

function _MyMarkDown_Patterns2_Apply(text, pats2) {
    let Features = CONFIG_MYMARKDOWN_PATTERN2_ACTIVE

    if (Features['Checkbox']) {
        text = text.replace(/\[ \]/g, '<input type="checkbox">')
        text = text.replace(/\[x\]/g, '<input type="checkbox" checked="">')
        pats2.removeAll('[ ]'); pats2.removeAll('[x]')}
    if (Features['svg']) {
        for (let pat of pats2) {
            if (pat.includes('[(svg)') || pat.includes('[(SVG)')) {
                text = _MyMarkDown_ReplaceSVG(text, pat)}}}
    if (Features['img']) {
        let endings = ['.png', 'PNG', 'jpg', 'JPG']
        let size = ''; let w = ''; let h = ''
        let part1 = ''
        for (let pat of pats2) {
            for (let ending of endings) {
                if (pat.endsWith(ending + ']')) {
                    part1 = RetStringBetween(pat, "[", "]")
                    if (part1.includes('(') && part1.includes(')')) {
                        size = RetStringBetween(part1, "(", ")")
                        w = size.until('x'); h = size.after('x')
                        part1 = part1.after(')')}
                    html = '<img src="' + part1 + '" width="' + w + '" height="'+ h +'">'
                    text = text.replace(pat, html)    
                } 
            }
        }}
    return text
}

function _MyMarkDown_Patterns3_Apply(text, pats3) {
    let Features = CONFIG_MYMARKDOWN_PATTERN3_ACTIVE
    let part1 = ''; let part2 = ''; let html = ''
    if (Features['Link']) {
        for (let pat of pats3) {
            part1 = RetStringBetween(pat, "[", "::")
            part2 = RetStringBetween(pat, "::", "]")
            html = '<a href="' + part2 + '" target="#">' + part1 + '</a>'
            text = text.replace(pat, html)
        }}

    return text
}

function _MyMarkDown_ReplaceSVG(text, pattern) {
    let idx = 0
    for (i = 0; i < CONFIG_SVG_FOR_MARKDOWN_REPLACE.length; i++) {
        if (CONFIG_SVG_FOR_MARKDOWN_REPLACE[i][0] == pattern) {
            idx = i
            break}}
    return text.replace(pattern, CONFIG_SVG_FOR_MARKDOWN_REPLACE[idx][1])
}


// ################################################################
// HTML    -> MarkDown                                            #
// ################################################################


function HTMLtoMyMarkdown(htmlText) {
	TraceFunctionCalls.pushX(arguments.callee.name)
    assert(typOf(htmlText) == 'str')

    markupText = _BackToMyMarkDown_FeaturesWithoutBrackets_Apply(htmlText)

    markupText = _BackToMyMarkDown_Patterns2_Apply(markupText)

    markupText = _BackToMyMarkDown_Patterns3_Apply(markupText)

    return markupText;
    }

function _BackToMyMarkDown_FeaturesWithoutBrackets_Apply(text) {
    let Features = CONFIG_MYMARKDOWN_FEATURES_ACTIVE

    if (Features['new Line']) {
        text = text.replace(new RegExp('<br>', "g") , '\n')}
    if (Features['multi Space']) {
        text = text.replace(/&nbsp;+/g, function(match) {return ' '.repeat(match.length / 6); });}// 6 is the length of '&nbsp;'

    return text
}

function _BackToMyMarkDown_Patterns2_Apply(text) {
    let Features = CONFIG_MYMARKDOWN_PATTERN2_ACTIVE

    if (Features['Checkbox']) {
        text = text.replace(/<input type="checkbox">/g, '[ ]')
        text = text.replace(/<input type="checkbox" checked="">/g, '[x]')}
    if (Features['svg']) {
        text = _replace_SVG_BACK_To_MyMarkdon(text)}
    if (Features['img']) {
        let imgTags = PatternsInText(text, ['<img', '>'])
        for (let imgTag of imgTags) {
            let w = RetStringBetween(imgTag,'width="', '"')
            let h = RetStringBetween(imgTag,'height="', '"')
            let src = RetStringBetween(imgTag,'src="', '"')
            let wh = wenn(w.length + h.length >0, '(' + w + 'x' + h + ')', '')
            let mark = '[' + wh + src + ']'
            text = text.replace(imgTag, mark)
            }
        }
    return text
}

function _BackToMyMarkDown_Patterns3_Apply(text) {
    let Features = CONFIG_MYMARKDOWN_PATTERN3_ACTIVE
    let part1 = ''; let part2 = ''
    if (Features['Link']) {
        text = text.replace('target="#"', '')
        var anchorRegex = /<a\s+(?:[^>]*?\s+)?href=(["'])(.*?)\1[^>]*?>(.*?)<\/a>/g;
        var text = text.replace(anchorRegex, '[$3::$2]');}

    return text
}

function _replace_SVG_BACK_To_MyMarkdon(htmlText) {
    let ret = htmlText
    let svgs = DOMElementsFromString(htmlText, 'svg')
    for (let svg of svgs) {
        ret = ret.replace(svg.outerHTML, 'xxy-' + svg.id + '-yxx')
        for (let rpl of CONFIG_SVG_FOR_MARKDOWN_REPLACE) {
            ret = ret.replace('xxy-' + rpl[2] + '-yxx', rpl[0])}
        }
    
    return ret
    }

function DOMElementsFromString(htmlString, tag) {
	TraceFunctionCalls.pushX(arguments.callee.name)
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');
    const svgElements = doc.querySelectorAll(tag);
    return Array.from(svgElements);
}
Object.defineProperties(document, {
    getElementsWithOnClickEvent: {
        value: function() {
            ret = []
            let all = document.getElementsByTagName('*');
            for (let a of all) {
                if (typeof a.onclick === 'function') {
                    ret.push(a)}    
            }
            return ret
        }
    }
});

Object.defineProperties(document, {
    getElementsByIDSubstring: {
        value: function(substring) {
            ret = []
            let all = document.getElementsByTagName('*');
            for (let a of all) {
                if (a.id.includes(substring)) {
                    ret.push(a)}    
            }
            return ret
        }
    }
});

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
    _remove: {
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
                this._remove(element)
            }
        }
    }
});

Object.defineProperties(Array.prototype, {
    removeItems: {
        value: function(liste) {
            for (element of liste) {
                this.removeAll(element)}
        }
    }
});


Object.defineProperties(Array.prototype, {
    toggle: {
        value: function(element) {
            if (this.includes(element)) {
                this._remove(element)}
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

// very simliar to map function
Object.defineProperties(Array.prototype, {
    applyToItems: {
        value: function(func, n = 0) {
            if (n < 0 || 5 < n) return
            for(let i=0; i<this.length; i++) {
                if (typOf(this[i]) == "list") {
                    this[i].applyToItems(func, n+1)
                } else {
                    this[i] = func(this[i])
                }
            }
        }
    }
});

Object.defineProperties(Array.prototype, {
    insertColum: {
        value: function(liste) {
            if (ListDepth(this) == 2) {
                if (this.length == liste.length) {
                    for (let i = 0; i < liste.length; i++) {
                        this[i].push(liste[i])}
                }
            }
        }
    }
});

Object.defineProperties(Array.prototype, {
    convert2: {
        value: function() {
            if (ListDepth(this) == 1) {
                for (let i = 0; i < this.length; i++) {
                    this[i] = [this[i]]}
            }
        }
    }
});

// only up to depth of 3
Object.defineProperties(Array.prototype, {
    Shape: {
        value: function() {
            assert(typOf(this) == 'list')
            if (ListDepth(this) == 1) return [this.length]
            
            if (ListDepth(this) == 2) {
                let r = this.length
                c = this[0].length
                for (let i = 0; i <r; i++) {
                    assert (this[i].length == c)}
                return [r,c]}

            if (ListDepth(this) == 3) {
                let r = this.length
                let s = this[0].Shape()
                for (let i = 0; i <r; i++) {
                    assert (IsEqual(s, this[i].Shape()))}
                return [r, s[0], s[1]]}
        }
    }
});

// MOHI: To be reworked
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

Object.defineProperties(Object.prototype, {
    keys: {
        value: function() {
              return Object.keys(this)
            }  
    } 
}); 

// key information gets lost here
Object.defineProperties(Object.prototype, {
    values: {
        value: function() {
            return Object.values(this)
            }  
    } 
}); 

Object.defineProperties(String.prototype, {
    until: {
        value: function(n) {
            if (n == '') {return this.substring(0)}     // return this will return the wrong data type 'String()'. Equvivalent to String(this)

            let idx = this.indexOf(n)
            if (idx == -1) { 
                return this.substring(0)}
            return this.substring(0,idx)
        }
    } 
});

Object.defineProperties(String.prototype, {
    after: {
        value: function(n) {
            if (n == '') {return this.substring(0)} 

            let idx = this.indexOf(n)
            if (idx == -1) { 
                return this.substring(0)}
            return this.substring(idx + n.length)
        }
    } 
});

Object.defineProperties(String.prototype, {
    count: {
        value: function(n) {
            let count = 0;
            for (let i = 0; i < this.length; i++) {
                if (this.substring(i,i+n.length) === n) {
                    count++;
                }
            }
            return count;
        }
    } 
});

// Whenever regex for some reason doesnt work
Object.defineProperties(String.prototype, {
    replaceN: {
        value: function(re, place, n = 1000) {
            let ret = String(this)
            for (let i = 0; i < n; i++) {
                if (ret.includes(re)) {
                    ret = ret.replace(re,place)}
                else {
                    break}
            }
            return ret;
        }
    } 
});

Object.defineProperties(String.prototype, {
    AsList: {
        value: function(n) {
            let ret = []
            for (let i = 0; i < n; i++) {
                ret.push(String(this))
            }
            return ret;
        }
    } 
});

Object.defineProperties(String.prototype, {
    trimPlus: {
        value: function(plusList, multi = true, std = true) {
            let ret = String(this)
            // Plus: specifically will remove all spaces if seen in specifc pattern 
            if (typOf(plusList) == 'list') {
                for (element of plusList) {
                    if (element.includes(' ')){
                        let rpl = element.replace(RegExp(' ', 'g'), '')
                        // ret = ret.replace(RegExp(element, 'g'), rpl)       will lead to failue
                        ret = ret.replaceN(element, rpl)
                    } 
                }
            }
            // Plus: generically will remove all multi spaces inside with normal blank space. 
            if (multi) ret = ret.replace(/  +/g, ' ');
            // Standard: removes starting and ending spaces
            if (std) ret = ret.trim()               
            return ret
        }

    } 
});


// ################################################################
// DOM /HTML Elements                                             #
// ################################################################

// ################################################################
// DOM /HTML Elements  - Table                                    #
// ################################################################

Object.defineProperties(Object.prototype, {
    mySetHeaders: {
        value: function(liste) {
            assert(this.tagName == 'TABLE')
            assert(this.rows[0].cells.length == liste.length)

            let headerRow = this.querySelector('thead tr');
            let headerCells = headerRow.cells;

            for (let i = 0; i < headerCells.length; i++) {
                headerCells[i].innerHTML = liste[i]}
        }
    }
});

Object.defineProperties(Object.prototype, {
    mySetHeadersID: {
        value: function(liste) {
            assert(this.tagName == 'TABLE')
            assert(this.rows[0].cells.length == liste.length)

            let headerRow = this.querySelector('thead tr');
            let headerCells = headerRow.cells;

            for (let i = 0; i < headerCells.length; i++) {
                headerCells[i].id = liste[i]}
        }
    }
});

Object.defineProperties(Object.prototype, {
    mySetHeadersClass: {
        value: function(liste) {
            assert(this.tagName == 'TABLE')
            assert(this.rows[0].cells.length == liste.length)

            let headerRow = this.querySelector('thead tr');
            let headerCells = headerRow.cells;

            for (let i = 0; i < headerCells.length; i++) {
                headerCells[i].className = liste[i]}
        }
    }
});

Object.defineProperties(Object.prototype, {
    mySetTHeadID: {
        value: function(id) {
            assert(this.tagName == 'TABLE')
            assert(typOf(id) == 'str')

            let thead = this.querySelector('thead');
            thead.id = id
        }
    }
});

Object.defineProperties(Object.prototype, {
    mySetTHeadClass: {
        value: function(classString) {
            assert(this.tagName == 'TABLE')
            assert(typOf(classString) == 'str')

            let thead = this.querySelector('thead');
            thead.className = classString
        }
    }
});

Object.defineProperties(Object.prototype, {
    mySetHRowID: {
        value: function(id) {
            assert(this.tagName == 'TABLE')
            assert(typOf(id) == 'str')

            let hrow = this.querySelector('thead tr');
            hrow.id = id
        }
    }
});

Object.defineProperties(Object.prototype, {
    mySetHRowClass: {
        value: function(classString) {
            assert(this.tagName == 'TABLE')
            assert(typOf(classString) == 'str')

            let hrow = this.querySelector('thead tr');
            hrow.className = classString
        }
    }
});

Object.defineProperties(Object.prototype, {
    mySetTBodyID: {
        value: function(id) {
            assert(this.tagName == 'TABLE')
            assert(typOf(id) == 'str')

            let tbody = this.querySelector('tbody');
            tbody.id = id
        }
    }
});

Object.defineProperties(Object.prototype, {
    mySetTBodyClass: {
        value: function(classString) {
            assert(this.tagName == 'TABLE')
            assert(typOf(classString) == 'str')

            let tbody = this.querySelector('tbody');
            tbody.className = classString
        }
    }
});

Object.defineProperties(Object.prototype, {
    mySetRowsID: {
        value: function(liste) {
            assert(this.tagName == 'TABLE')
            assert(this.rows.length -1 == liste.length )    // excluding the header row

            let tbody = this.querySelector('tbody');

            for (let i = 0; i < tbody.rows.length; i++) {
                tbody.rows[i].id = liste[i]}
        }
    }
});

Object.defineProperties(Object.prototype, {
    mySetRowsClass: {
        value: function(liste) {
            assert(this.tagName == 'TABLE')
            assert(this.rows.length -1 == liste.length)     // excluding the header row

            let tbody = this.querySelector('tbody');

            for (let i = 0; i < tbody.rows.length; i++) {
                tbody.rows[i].className = liste[i]}
        }
    }
});

Object.defineProperties(Object.prototype, {
    mySetCells: {
        value: function(liste) {
            assert(this.tagName == 'TABLE')
            assert(this.rows.length -1 == liste.length)

            let tbody = this.querySelector('tbody');

            for (let i = 0; i < tbody.rows.length; i++) {
                assert(tbody.rows[i].cells.length == liste[i].length)
                for (let j = 0; j < tbody.rows[i].cells.length; j++) {
                    tbody.rows[i].cells[j].innerHTML = liste[i][j]}
                }
        }
    }
});

Object.defineProperties(Object.prototype, {
    mySetCellsID: {
        value: function(liste) {
            assert(this.tagName == 'TABLE')
            assert(this.rows.length -1 == liste.length)

            let tbody = this.querySelector('tbody');

            for (let i = 0; i < tbody.rows.length; i++) {
                assert(tbody.rows[i].cells.length == liste[i].length)
                for (let j = 0; j < tbody.rows[i].cells.length; j++) {
                    tbody.rows[i].cells[j].id = liste[i][j]}
                }
        }
    }
});

Object.defineProperties(Object.prototype, {
    mySetCellsClass: {
        value: function(liste) {
            assert(this.tagName == 'TABLE')
            assert(this.rows.length -1 == liste.length)

            let tbody = this.querySelector('tbody');

            for (let i = 0; i < tbody.rows.length; i++) {
                assert(tbody.rows[i].cells.length == liste[i].length)
                for (let j = 0; j < tbody.rows[i].cells.length; j++) {
                    tbody.rows[i].cells[j].className= liste[i][j]}
                }
        }
    }
});

// ################################################################
// DOM /HTML Elements  - Other                                    #
// ################################################################

// Note: When no parent with ID was found, then the ego element is returned
Object.defineProperties(Object.prototype, {
    GetParentWithID: {
        value: function(iterations = 10) {
            let parent = this
            for (i = 0; i<iterations; i++) {
                if (parent.tagName == "BODY") {
                    return this}
                if (parent.id != '') {
                    return parent}
                parent = parent.parentElement
            }
            return this
        }
    }
});

Object.defineProperties(Object.prototype, {
    IsDescendantOf: {
        value: function(ancestor, iterations = 20) {
            let ego = this
            for (i = 0; i<iterations; i++) {
                if (ego.tagName == "BODY") {
                    return false}
                if (ego.parentElement === null) {
                    return false}
                if (ego === ancestor) {
                    return true}
                ego = ego.parentElement
            }
            return false
        }
    }
});
