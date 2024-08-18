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

function HTMLTable_FromConfig(config) {
    let fullConfig = HTMLTable_FullConfig(config)
    _HTMLTable_ConfigAssert(fullConfig)
    
    return _HTMLTable_FromConfigRaw(fullConfig)
}

function HTMLTable_FromMarkdown(markdownString) {
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
    // will lead to wrong result: let fullConfig = { ...BASIS_HTMLTABLE_CONFIG, ...config }; 
    // because the deimension may not fit. The merge must be done manually

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
    let Row = function (a,b,c) {return _htmltable_Row(a,b,c)}
    let Body = function (a,b) {return _htmltable_Body(a,b)}
    let ret = ""
    ret += Tag('table', {id:cfg["tableID"], clas:cfg["tableClass"], style:cfg["tableStyle"]})
    ret += Tag('thead', {id:cfg["theadID"], clas:cfg["theadClass"], style:cfg["theadStyle"]})
    ret += Row("th", cfg["thsText"], {id:cfg["trhID"], clas:cfg["trhClass"], style:cfg["thStyle"],
                         ids:cfg["thsID"], classes:cfg["thsClass"], styles:cfg["thsStyle"]})
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

function HTMLTable_TableRowsCols(p = {'thsText' : [],'cellsText' : []}) {
    assert(!(IsEqual(p['thsText'], []) && IsEqual(p['cellsText'], [])))

    let r = 0;let c = 0
    if (!IsEqual(p['thsText'], [])) {
        assert(typOf(p['thsText'], true) == "list-1D")
        c = p['thsText'].length}

    if (!IsEqual(p['cellsText'], [])) {
        assert(typOf(p['cellsText'], true) == "list-2D")
        r = p['cellsText'].length 
        if (c == 0) {
            c = p['cellsText'][0].length}
    }

    return [r,c]
}

function HTMLTable_DefaultVal(key, nCols, nRows) {
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
    let ret = "<" + tag + " "
    ret += Tag_PropertyString("id", id)
    ret += Tag_PropertyString("class", clas)
    ret += Tag_PropertyString("style", style)
    ret += '>'
    return ret}

function _htmltable_Body(rows, cfg) {
    let Row = function (a,b,c) {return _htmltable_Row(a,b,c)}
    let ret = ""
    for (let i = 0;i<rows.length;i++) {
        if (IsEqual(cfg, {})) {
            ret += Row("td", rows[i], {})}
        else {
            ret += Row("td", rows[i], {
                id:cfg["rowsID"][i], clas:cfg["rowsClass"][i], style:cfg["rowsStyle"][i], 
                ids:cfg["cellsID"][i], classes:cfg["cellsClass"][i], styles:cfg["cellsStyle"][i]})}
    }
    return ret
}

function _htmltable_Row(tx, cells, {id="", clas="", style="", ids=["",""], classes=["",""], styles=["",""]}) {
    let Tag = function (key, val) {return _htmltable_Tag(key, val)}
    let ret = Tag("tr", {id:id, clas:clas, style:style})
    for (let i = 0;i<cells.length;i++) {
        ret += Tag(tx, {id:ids[i], clas:classes[i], style:styles[i]})
        ret += cells[i] + '</' + tx + '>';}

    return ret +"</tr>"}

function _htmltable_Tag_PropertyString(key, val) {
    let ret = ""
    if (val.length > 0) {
        ret += key + '="' + val + '" '}
    return ret}