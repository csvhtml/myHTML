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

function NewDiv(config) {
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

function IsThereDiv(divID) {
        return document.getElementById(divID) !== null;
}